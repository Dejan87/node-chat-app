const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

// Create public path
const publicPath = path.join(__dirname, "../public");

// Create express app, configure the port and socket.io into the server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

const users = new Users(); // Create an instance of Users

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are required.");
        }

        socket.join(params.room);
        users.removeUser(socket.id); // Make sure that there is no user with that id
        users.addUser(socket.id, params.name, params.room); // Add new user

        // Update UI, let everyone in the room know that new user joined
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        // Greet user when he/she joins the chat
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));

        // Alert others that new user has joined the chat
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined.`));

        callback();
    });

    socket.on("createMessage", (message, callback) => {
        console.log("createMessage", message);

        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room)); // Update user list when someone disconnects
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left.`)); // Print a message who left the chat
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});