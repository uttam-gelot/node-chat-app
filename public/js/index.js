
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
    var formatedTime = moment().format("h:mm a");
    var li = $("<li></li>");
    li.text(`${message.from} ${formatedTime}: ${message.text}`);
    $("#messages").append(li);
});

socket.on("newLocationMessage", function (message) 
{
    
    var formatedTime = moment().format("h:mm a");
    var li = $("<li></li>");
    var a = $("<a target = '_blank'>My current location</a>");
    li.text(`${message.from} ${formatedTime}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#form").on("submit", function (e) 
{
    var messageTextBox = $("[name = message]");
    e.preventDefault();
    socket.emit("createMessage",
    {
        from: "User",
        text: messageTextBox.val()
    }, function () 
    {
        messageTextBox.val("");
    });
});

var locationButton = $("#send-location");
locationButton.on("click", function () 
{
    if(!navigator.geolocation)
    {
        return alert("Geolocation is not supported by your browser...");
    }
    locationButton.attr("disabled", "disabled").text("Sending Location...");
    navigator.geolocation.getCurrentPosition(function(position) 
    {
        locationButton.removeAttr("disabled").text("Send Location");
        socket.emit("createLocationMessage",
        {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (error) 
    {
        locationButton.removeAttr("disabled").text("Send Location");
        console.log(error);
        alert("Unable to fetch location...");
    });
});