const webSocketServer = require("websocket").server;
const http = require("http");
const { connected } = require("process");
const webSocketServerPort = 8000;

const server=http.createServer();
server.listen(webSocketServerPort);
console.log("listening on port 8000...")

const wsServer = new webSocketServer({
    httpServer: server,
})

const generateID = () => "id" + Math.random().toString(16).slice(2);
const connectedUsers = {};

wsServer.on("request", function(request){
    let id = generateID();
    console.log("Connection request from "+request.origin+".")

    const connection = request.accept(null, request.origin);
    connectedUsers[id]=connection;
    console.log(
        "Connection established: "+
        id +
        " in "+
        Object.getOwnPropertyNames(connectedUsers)
    );

    console.log("test1")

    connection.on("message", function(message){
        console.log("Received Message: ", message.utf8Data);
        
        for(id in connectedUsers){
            connectedUsers[id].sendUTF(message.utf8Data);
            //console.log("Sent mensaje to: ", connectedUsers[id]);
        }
    })
})