const io = require("socket.io")(8080, {
  cors: {
    origin: ["https://messenger-clone-peach-two.vercel.app/"],
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
