var socket = io();
socket.on("connect", function() 
{
    console.log("connected to server..");
    socket.emit("createEmail",
    {
        to: "ved@example.com",
        text: "hey buddy.."
    });
    socket.emit("createMessage",
    {
        to: "shubh",
        text: "hey shubh",
    });
});
socket.on("disconnect", function()
{
    console.log("disconnected from server...");
});
socket.on("newEmail", function (email) 
{
    console.log("New Mail", email);
});
socket.on("newMessage", function (body) 
{
    console.log("message body...", body);
});