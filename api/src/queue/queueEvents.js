const { QueueEvents } = require("bullmq");
const connection = require("../config/redis");
const { getIO } = require("../socket/index");
const emailQueue = require("./email.queue");
const FailedJobs = require("../models/FailedJob.model");
const saveFailedJob = require("../services/failedJob.service");
const queueEvent = new QueueEvents("emails", {
  connection,
});
// console.log("QUEUE EVENT FIRED");

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
queueEvent.on("failed", async ({ jobId }) => {
  const io = getIO();
  io.to(jobId.toString()).emit("job:update", {
    jobId,
    state: "failed",
  });
  const job = await emailQueue.getJob(jobId);
  await saveFailedJob(job);
});
async function init() {
  await queueEvent.waitUntilReady();
  console.log("queueEvent Connected Successfully");
}
init();
module.exports = queueEvent;
