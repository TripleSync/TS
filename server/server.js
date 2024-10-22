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
});

server.listen(5000, () => {
  console.log("listening on 5000");
});

app.get("*", (req, res) => {
  res.sendFile("../dist/index.html");
});
