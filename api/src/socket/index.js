const { Server } = require("socket.io");
let io;
function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connect", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("subscribe-job", (jobId) => {
      socket.join(jobId);
      console.log(`${socket.id} subscribed to ${jobId}`);
    });
    socket.on("unsubscribe-job", (jobId) => {
      console.log("unsubsribed", jobId);
      socket.leave(jobId.toString());
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
function getIO() {
  return io;
}
module.exports = { initSocket, getIO };
