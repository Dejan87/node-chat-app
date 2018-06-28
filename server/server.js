const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

// Create public path
const publicPath = path.join(__dirname, "../public");

// Create express app, configure the port and socket.io into the server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", {
        from: "John",
        text: "See you then.",
        createdAt: 123
    });

    socket.on("createMessage", (newMessage) => {
        console.log("createMessage", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});