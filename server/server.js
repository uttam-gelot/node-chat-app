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
        console.log("client disconnected...");
    });
    
});

server.listen(port, () =>
{
    console.log(`server is up on port ${port}`);
});