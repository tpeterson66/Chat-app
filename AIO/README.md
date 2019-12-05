# All-in-One NodeJS SocketIO Chat Application
This is a very basic NodeJS application that starts up a nodejs webserver running express and SocketIO. When you navigate to http://ip_address:3000, a static website will be loaded with Javascript used to send messages to the socketIO server.

This folder also includes a Dockerfile that can be used to load the nodeJS app in a container.

## Docker
To start the NodeJS application in docker:

Build the new NodeJS application assuming you're running docker build from within the AIO folder.
```
docker build -t <username>/<app-name> .
```

Start the new container image by running:
```
docker run -p 3000:3000 -d -name chat-app <username>/<app-name>
```

## Review
This project was pretty fun. Learned how to create a simple form in Pure JavaScript and then modify it a little bit from the guide I was following. Although it was a simple app, it shows some of the power of SocketIO.