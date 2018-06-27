const path = require("path");
const express = require("express");

// Creat express app, and configure port
const app = express();
const port = process.env.PORT || 3000;

// Create public path
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});