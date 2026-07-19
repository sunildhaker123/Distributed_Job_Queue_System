const { QueueEvents } = require("bullmq");
const connection = require("../config/redis");
const emailQueue = require("./email.queue");
const saveFailedJob = require("../services/failedJob.service");
const { emitJobUpdate } = require("../services/socket.service");
const queueEvent = new QueueEvents("emails", {
  connection,
});
// console.log("QUEUE EVENT FIRED");

queueEvent.on("completed", ({ jobId }) => {
  //console.log("Emitting for job:", jobId);
  emitJobUpdate(jobId, "completed");
});
queueEvent.on("waiting", ({ jobId }) => {
  emitJobUpdate(jobId, "waiting");
});
queueEvent.on("active", ({ jobId }) => {
  emitJobUpdate(jobId, "active");
});
queueEvent.on("failed", async ({ jobId }) => {
  emitJobUpdate(jobId, "failed");
  const job = await emailQueue.getJob(jobId);
  await saveFailedJob(job);
});
async function init() {
  await queueEvent.waitUntilReady();
  console.log("queueEvent Connected Successfully");
}
init();
module.exports = queueEvent;
