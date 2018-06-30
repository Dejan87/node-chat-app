const socket = io();

socket.on("connect", function() {
    console.log("Connected to server");

});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
    const formattedTime = moment(message.createdAt).format("h:mm a");

    let li = $("<li></li>");
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
    e.preventDefault();

    let messageTextbox =  $("[name=message]");

    socket.emit("createMessage", {
        from: "User",
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val("");
    });
});