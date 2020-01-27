require('dotenv').config()
const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const seq = require('seq-logging');
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/chat"
const seqServer = process.env.SEQ_SERVER || null
const port = process.env.PORT || 3002
var logger = new seq.Logger({ serverUrl: seqServer });

app.use(bodyParser.json())
// MongoDB Stuff
var MongoClient = require('mongodb').MongoClient;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function logMessageSeq(event) {
  if (!seqServer) {
    console.log(event)
  } else {
    logger.emit(event)
  }
}

// log incomming connection
app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logMessageSeq({
    timestamp: new Date(),
    level: 'Information',
    messageTemplate: `Incoming request from {ip}`,
    properties: {
      ip
    }
  });
  next()
});

function addUserToDB(collection, document) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      var db = client.db('chat');
      db.collection(collection).insertOne(document, function (err, result) {
        if (err) reject(err);
        if (result) {
          resolve(result.ops)
        };
        client.close();
      });
    });
  })
};

function getUserFromDB(collection, email) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      var db = client.db('chat');
      db.collection(collection).findOne({ email: email }, function (err, result) {
        if (result === null) {
          reject()
        } else {
          resolve(result);
        }
      })
    })
  })
};

app.post('/register', (req, res) => {
  getUserFromDB('users', req.body.email)
    .then((result) => { //user already exists with this email!
      res.status(400).send({
        email: result.email
      })
    })
    .catch(() => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) throw err;
          addUserToDB('users', {
            // Store the hashed password in the database
            email: req.body.email,
            username: req.body.username,
            password: hash,
            avatar: req.body.avatar
          })
            .then((doc) => {
              // Sign and send back token!!!
              var token = jwt.sign({
                email: doc[0].email,
                _id: doc[0]._id,
                avatar: doc[0].avatar,
                username: doc[0].username
              }, process.env.JWT_SECRET, { expiresIn: '30m' });
              // Send it back to the client now!
              res.status(201).send({
                email: doc[0].email,
                username: doc[0].username,
                _id: doc[0]._id,
                token,
                expiresIn: 30 * 60
              })
            })
            .catch((err) => {
              res.status(401).send('could not create user account')
            })
        });
      });
    })
});

app.post('/login', (req, res) => {
  getUserFromDB('users', req.body.email)
    .then(user => {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          res.sendStatus(403);
        }
        if (result === true) {
          // create token
          var token = jwt.sign({
            email: user.email,
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
          }, process.env.JWT_SECRET, { expiresIn: "30m" });
          res.send({
            email: user.email,
            _id: user._id,
            username: user.username,
            token,
            expiresIn: 30 * 60
          })
        } else {
          res.sendStatus(403)
        }
      });
    }).catch(err => { res.sendStatus(403) })
});

app.get('/status', (req, res) => {
  async function checkHeader(request) {
    return new Promise((resolve, reject) => {
      if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
        resolve(request.headers.authorization.split(' ')[1])
      } else { reject() }
    })
  }
  checkHeader(req)
    .then(token => {
      jwt.verify(token, process.env.JWT_SECRET, function (err, JWTData) {
        if (err) { res.send(err) } else { res.send(JWTData) }
      })
    })
    .catch(err => { res.sendStatus(403); console.log(err) })
});

http.listen(port, function () {
  console.log(`listening on *:${port}`);
});