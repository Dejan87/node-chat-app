const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

// Create public path
const publicPath = path.join(__dirname, "../public");

// Create express app, configure the port and socket.io into the server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("New user connected");

    // Greet user when he/she joins the chat
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));

    // Alert others that new user has joined the chat
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined!"));

    socket.on("createMessage", (message, callback) => {
        console.log("createMessage", message);

        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("This is from the server!");
        // socket.broadcast.emit("newMessage", {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});