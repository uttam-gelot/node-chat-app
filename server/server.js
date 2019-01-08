const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const {generateMessage, generateLocationMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 4444;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) =>
{
    console.log("new user connected...");

    socket.broadcast.emit("newMessage",generateMessage("Admin", "new user joined chat-room"));

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat-app"));
    
    socket.on("disconnect", () =>
    {
        console.log("client disconnected..");
    });
    
    socket.on("createMessage",(message, callback) =>
    {
        console.log("create message..", message);
        
        io.emit("newMessage",generateMessage(message.from, message.text));

        callback("this is from server...");
    });
    socket.on("createLocationMessage", (coords) =>
    {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
});

server.listen(port, () =>
{
    console.log(`server is up on port ${port}`);
});