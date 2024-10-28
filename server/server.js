const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["*"] },
});

app.use(express.static(__dirname + "'../dist'"));

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  // 필기 좌표 전송
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data); // 다른 클라이언트에게 필기 좌표 전송
  });

  socket.on("clearCanvas", () => {
    io.emit("clearCanvas");
  });
  // 이미지 업데이트 전송
  socket.on("updateImage", (data) => {
    socket.broadcast.emit("updateImage", data); // 다른 클라이언트에게 이미지 업데이트 전송
  });
});

server.listen(5000, () => {
  console.log("listening on 5000");
});

app.get("*", (req, res) => {
  res.sendFile("../dist/index.html");
});
