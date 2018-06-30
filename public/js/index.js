var socket = io();

socket.on("connect", function() {
    console.log("Connected to server");

});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
});

$("#message-form").on("submit", function(e) {
    e.preventDefault();

    var messageTextbox =  $("[name=message]");

    socket.emit("createMessage", {
        from: "User",
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val("");
    });
});