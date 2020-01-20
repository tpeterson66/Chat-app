# Chat-app
This is a basic chat-app that can be used for demos. It has the following components:

1. React Frontend - webui folder
Setup your local .env file using the env.sample for refrence. This also requires that you have NodeJS and NPM installed. Additionally, make sure you have react-scripts installed globally.
```
cd webui
npm install
npm start
```

2. Chat-Service - services/chat-service
This is the chat API that is used to send, recieve and save/read messages from the MongoDB.
Setup your .env file using the sample.env file in the folder.
```
cd services/chat-service
npm install
npm run dev
```
