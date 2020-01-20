# Chat Service

## Work in progress
- Need to add JWT validation and obtain things like username and avatar from the JWT vs. post data.
- Need to add pagination so that only the newest 10 messages are returned and then allow for scrolling in the frontend, likely a load-more button :)
- Need to add some SocketIO support in React and then fix it on the API here.

## GET - /status
returns a 200 code that can be used to check the health of the serivce. Real simple.

## POST - /incoming
Used to post a new message to the API and save the post to the DB.

Requires:
- username: String
- message: String
- avatar: String(URL)

When added to the database, the following is added:
- Date
- _id

Returns error code 400 if there's an error
Returns 200 and the new message via JSON

## POST - /messages
Used to get the current messages from the databse.

Requires:
- channel

Returns 400 if there's an error
Returns 200 and JSON array of messages if successful

# Starting the service
Its a simple nodeJS app, so the typical setup process for this one.
```
npm install
npm run dev # for nodemon in dev
npm start # for node index.js in prod
```