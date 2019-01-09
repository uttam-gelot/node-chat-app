
var socket = io();

function scrollToBottom()
{
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");
    
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
    {
        messages.scrollTop(scrollHeight)
    }
}

socket.on("connect", function() 
{
    console.log("connected to server..");
    var params = $.deparam(window.location.search);
    socket.emit("join", params, function (error) 
    {
        if(error)
        {
            alert(error);
            window.location.href = "/";
        }
    });
});
socket.on("disconnect", function()
{
    console.log("disconnected from server...");
});

socket.on("updateUserList", function (users) 
{
    var ol = $("<ol></ol>");
    users.forEach(function (user) 
    {  
        ol.append($("<li></li>").text(user));
    });
    $("#users").html(ol);
});

socket.on("newMessage", function (message) 
{
    var formatedTime = moment().format("h:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template,
    {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function (message) 
{
    
    var formatedTime = moment().format("h:mm a");

    var template = $("#location-message-template").html();
    var html = Mustache.render(template,
    {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });
 
    $("#messages").append(html);
    scrollToBottom();
});

$("#form").on("submit", function (e) 
{
    var messageTextBox = $("[name = message]");
    e.preventDefault();
    socket.emit("createMessage",
    {
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