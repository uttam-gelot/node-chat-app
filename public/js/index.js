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

socket.on("newLocationMessage", function (message) 
{
    var li = $("<li></li>");
    var a = $("<a target = '_blank'>My current location</a>");
    li.text(`${message.from} : `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

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
    navigator.geolocation.getCurrentPosition(function(position) 
    {
        socket.emit("createLocationMessage",
        {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (error) 
    {
        console.log(error);
        alert("Unable to fetch location...");
    });
});