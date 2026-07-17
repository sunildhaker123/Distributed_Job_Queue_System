const FailedJob = require("../models/FailedJob.model");

const saveFailedJob = async function saveFailedJob(job) {
  if (job.attemptsMade >= job.opts.attempts) {
    const exists = await FailedJob.findOne({
      originalJobId: job.id,
    });
    if (!exists) {
      console.log("saved to db");
      await FailedJob.create({
        originalJobId: job.id,
        queueName: job.queueName,
        payload: job.data,
        failedReason: job.failedReason,
        attemptsMade: job.attemptsMade,
        status: "pending",
        failedAt: new Date(),
      });
    }
  }
};
module.exports = saveFailedJob;
