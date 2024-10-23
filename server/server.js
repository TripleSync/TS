const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["*"], credentials: true },
});

app.use(express.static(__dirname + "'../dist'"));

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  // 강의실 입장
  socket.on("joinRoom", (data) => {
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
    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
      socket.to(roomId).emit("userDisconnect");
      console.log("유저가 강의실에서 퇴장하였습니다.");
    });
  });
});

const PORT = process.env.VITE_SOCKET_PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile("../dist/index.html");
});
