const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 5555;

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

    socket.on("createEmail", (newEmail) =>
    {
        console.log("createEmail", newEmail);
    });

    // socket.emit("newEmail",
    // {
    //     from: "uttam@example.com",
    //     text: "Hey what's going on...",
    //     cratedAt: 234
    // });
    
    socket.on("createMessage",(message) =>
    {
        console.log("create message..", message);
        // io.emit("newMessage",
        // {
        //     from: message.from,
        //     text: message.text,
        //     cratedAt: new Date().getTime()
        // });
        socket.broadcast.emit("newMessage",generateMessage(message.from, message.text));
    });
});

server.listen(port, () =>
{
    console.log(`server is up on port ${port}`);
});