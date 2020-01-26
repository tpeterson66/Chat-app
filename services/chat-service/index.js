require('sqreen');
require('dotenv').config()
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;
const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/chat"
const port = process.env.PORT || 3001

app.use(bodyParser.json())


// Verify token on protected routes
async function isAuthenticated(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = (req.headers.authorization.split(' ')[1]);
    jwt.verify(token, process.env.JWT_SECRET, function (err, JWTData) {
      if (err) {
        res.sendStatus(403)
      } else {
        next();
      };
    })
  } else { res.sendStatus(403) }
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/status', (req, res) => {
  res.send()
});

app.post('/incoming', isAuthenticated, (req, res) => {
  console.log(req.body)
  if (!req.body.channel || !req.body.username || !req.body.message || !req.body.avatar) return res.send(401)
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db('chat');
    db.collection(req.body.channel).insertOne({
      userID: req.body._id,
      username: req.body.username,
      message: req.body.message,
      avatar: req.body.avatar,
      date: moment().format("MM/DD/YYYY h:mm A")
    }, (err, results) => {
      if (err) { res.status(400).send(err); client.close(); }
      if (results) {
        res.send(results.ops);
        client.close();
      }
    })
  })
});

// Messages with JWT Check
app.post('/messages', isAuthenticated, (req, res) => {
  if (!req.body.channel) res.send(401)
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db('chat');
    db.collection(req.body.channel).find().toArray().then(items => {
      res.send(items);
      client.close()
    }).catch(err => {
      client.close()
      res.status(400).send(err)
    })
  });
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function () {
  console.log(`listening on *:${port}`);
});