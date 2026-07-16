const { QueueEvents } = require("bullmq");
const connection = require("../redis");
const { getIO } = require("../socket/index");
const emailQueue = require("../queue");
const FailedJobs = require("../models/FailedJobs");
const queueEvent = new QueueEvents("emails", {
  connection,
});
// console.log("QUEUE EVENT FIRED");

const io = getIO();

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
  const job = await emailQueue.getJob(jobId);
  if (job.attemptsMade >= job.opts.attempts) {
    await FailedJobs.create({
      originalJobId: job.id,
      queueName: job.queueName,
      payload: job.data,
      failedReason: job.failedReason,
      attemptsMade: job.attemptsMade,
      status: "pending",
      failedAt: new Date(),
    });
  }
});
async function init() {
  await queueEvent.waitUntilReady();
  console.log("queueEvent Connected Successfully");
}
init();
module.exports = queueEvent;
