const { QueueEvents } = require("bullmq");
const connection = require("../redis");
const { getIO } = require("../socket/index");
const queueEvent = new QueueEvents("emails", {
  connection,
});
// console.log("QUEUE EVENT FIRED");

const io = getIO();

// console.log(io ? "IO EXISTS" : "IO UNDEFINED");
// queueEvent.on("completed", ({ jobId }) => {
//   console.log("Emitting for job:", jobId);
//   const io = getIO();

//   // io.to(jobId).emit("job:update", {
//   //   jobId,
//   //   state: "completed",
//   // });
//   io.emit("job:update", {
//     jobId,
//     state: "completed",
//   });
// });
queueEvent.on("completed", ({ jobId }) => {
  //console.log("Emitting for job:", jobId);

  const io = getIO();

  io.to(jobId.toString()).emit("job:update", {
    jobId,
    state: "completed",
  });
});
queueEvent.on("waiting", ({ jobId }) => {
  const io = getIO();
  io.to(jobId.toString()).emit("job:update", {
    jobId,
    state: "waiting",
  });
});
queueEvent.on("active", ({ jobId }) => {
  const io = getIO();
  io.to(jobId.toString()).emit("job:update", {
    jobId,
    state: "active",
  });
});
async function init() {
  await queueEvent.waitUntilReady();
  console.log("queueEvent Connected Successfully");
}
init();
module.exports = queueEvent;
