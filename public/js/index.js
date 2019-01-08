var socket = io();
socket.on("connect", function() 
{
    console.log("connected to server..");
});
socket.on("disconnect", function()
{
    console.log("disconnected from server...");
});
// socket.on("newEmail", function (email) 
// {
//     console.log("New Mail", email);
// });
socket.on("newMessage", function (message) 
{
    console.log("message body...", message);
    var li = $("<li></li>");
    li.text(`${message.from} : ${message.text}`);
    $("#messages").append(li);
});

// socket.emit("createMessage",
// {
//     from: "shubh",
//     text: "hey shubh",
//     createdAt: new Date().getTime()
// }, function (data) 
// {
//     console.log("got it", data);
// });

$("#form").on("submit", function (e) 
{
    e.preventDefault();
    socket.emit("createMessage",
    {
        from: "User",
        text: $("[name = message]").val()
    }, function () 
    {
            
    });
});

var locationbutton = $("#send-location");
locationbutton.on("click", function () 
{
    if(!navigator.geolocation)
    {
        return alert("Geolocation is not supported by your browser...");
    }
    navigator.geolocation.getCurrentPosition(function (position) 
    {
        console.log(position);
        
    }, function () 
    {
        alert("Unable to fetch location...");
    });
});