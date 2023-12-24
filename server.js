const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (number) => {
    io.emit("refresh");
    console.log(number);
  });
  socket.on("scroll-down", () => {
    io.emit("scroll");
  });
});
