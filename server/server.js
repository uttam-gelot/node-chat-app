const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 5555;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) =>
{
    console.log("new user connected...");
    socket.on("disconnect", () =>
    {
        console.log("client disconnected..");
    });

    socket.on("createEmail", (newEmail) =>
    {
        console.log("createEmail", newEmail);
    });

    socket.emit("newEmail",
    {
        from: "uttam@example.com",
        text: "Hey what's going on...",
        cratedAt: 234
    });
    socket.emit("newMessage",
    {
        from: "ket",
        text: "hey can we meet ?",
        cratedAt: 134
    });
    socket.on("createMessage",(body) =>
    {
        console.log("create message..", body);
    });
});

server.listen(port, () =>
{
    console.log(`server is up on port ${port}`);
});