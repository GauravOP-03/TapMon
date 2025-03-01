require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust as needed
    methods: ["GET", "POST"],
  },
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

main()
  .then((e) => {
    console.log("Database Connected");
  })
  .catch((er) => {
    console.log(er);
  });
app.use("/api", require("./routes/auth"));
app.use("/api/vitals", require("./routes/vitalInformation"));
let messages = [];

// Socket.io event listeners
io.on("connection", (socket) => {
  console.log("A user connected");
  
  // Send existing messages to new connections
  socket.emit("initialMessages", messages);
  
  socket.on("sendMessage", (message) => {
    // console.log("Message received:", message);
    messages.push(message);
    // Broadcast to all clients EXCEPT sender
    socket.broadcast.emit("receiveMessage", message);
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// REST API endpoint to fetch messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

  

async function data(){

    let result = await chat.sendMessage("I have 2 dogs in my house.");
    console.log(result.response.text());
    result = await chat.sendMessage("How many paws are in my house?");
    console.log(result.response.text());
}
// data();

server.listen(5000, () => {
  console.log("Server running on port 5000");
});