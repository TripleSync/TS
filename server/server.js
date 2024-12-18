const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["*"], credentials: true },
});

let currentImg = null;
let currentLines = [];
const users = {};
app.use(express.static(__dirname + "'../dist'"));

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("initialize", (data) => {
    const { name, roomId } = data;

    users[socket.id] = { name, roomId };
    socket.join(roomId);
    console.log("Rooms the socket is in now:", socket.rooms);
    // if (currentImg) {
    //   console.log("Sending current image to new user");
    //   socket.broadcast.emit("updateImage", currentImg);
    // }
    // if (currentLines.length > 0) {
    //   socket.broadcast.emit("initializeLines", currentLines);
    // }
  });

  // 강의실 입장
  socket.on("join_room", (data) => {
    socket.join(data.roomId);
    const room = io.sockets.adapter.rooms.get(data.roomId);
    if (room.size === 1) {
      console.log("강의실에 1명이 입장하였습니다.");
    } else if (room.size === 2) {
      console.log("강의실에 2명이 입장하였습니다.");
      io.to(data.roomId).emit("userConnection", Array.from(room));
    } else {
      console.log("해당 강의실은 만석입니다.");
      socket.emit("fullRoom", data.roomId);
    }
  });

  socket.on("message", (message) => {
    const user = users[socket.id];
    if (user && user.roomId) {
      io.to(user.roomId).emit("message", message);
    }
  });

  // videoChat offer
  socket.on("createOffer", ({ sdp, roomId }) => {
    socket.to(roomId).emit("getOffer", sdp);
  });

  // videoChat answer
  socket.on("createAnswer", ({ sdp, roomId }) => {
    socket.to(roomId).emit("getAnswer", sdp);
  });

  // videoChat ice candidate
  socket.on("createCandidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("getCandidate", candidate);
  });

  // 강의실 퇴장
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // 필기 좌표 전송
  socket.on("draw", (data) => {
    // currentLines.push(data);
    const user = users[socket.id];
    if (user && user.roomId) {
      socket.broadcast.to(user.roomId).emit("draw", data);
    }
  });

  socket.on("clearCanvas", () => {
    // currentLines = [];
    const user = users[socket.id];
    if (user && user.roomId) {
      socket.broadcast.to(user.roomId).emit("clearCanvas", data);
    }
  });

  // 이미지 업데이트 전송
  socket.on("updateImage", (data) => {
    // currentImg = data;
    const user = users[socket.id];
    if (user && user.roomId) {
      socket.broadcast.to(user.roomId).emit("updateImage", data);
    }
  });
});

const PORT = process.env.VITE_SOCKET_PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile("../dist/index.html");
});
