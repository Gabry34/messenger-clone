// const io = require("socket.io")(8080, {
//   cors: {
//     origin: ["https://messenger-clone-peach-two.vercel.app"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on("send-message", (number) => {
//     io.emit("refresh");
//     console.log(number);
//   });
//   socket.on("scroll-down", () => {
//     io.emit("scroll");
//   });
//   socket.on("get-user-data", () => {
//     // Creare una stanza unica per il socket corrente
//     const userRoom = socket.id;

//     // Unire il socket corrente alla stanza
//     socket.join(userRoom);

//     // Emettere l'evento solo alla stanza del socket corrente
//     io.to(userRoom).emit("get-data");
//   });
//   socket.on("open-preferences-modal", () => {
//     const userRoom = socket.id;
//     console.log("ciao");

//     // Unire il socket corrente alla stanza
//     socket.join(userRoom);

//     // Emettere l'evento solo alla stanza del socket corrente
//     io.to(userRoom).emit("open-modal");
//   });
// });
