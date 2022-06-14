const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const PORT = process.env.PORT || 5000;

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // join_room
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User with ID: ${socket.id} joined room: ${data.room}`)

    socket.to(data.room).emit("into_room", (data));
  })

  // send_message
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  // leave_chat
  socket.on("disconnect_room", (data) => {
    console.log(data);
    socket.leave(data.room);
    socket.to(data.room).emit("left_chat", (data))
    console.log(`${socket.id} ${data.username} has left the room`);
  })
})


app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running at Port, ${PORT}`);
})