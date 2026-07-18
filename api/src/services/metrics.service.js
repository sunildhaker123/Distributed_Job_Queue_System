const emailQueue = require("../queue/email.queue");
const FailedJob = require("../models/FailedJob.model");
// const FailedJob = require("");
async function getMetrics() {
  try {
    const counts = await emailQueue.getJobCounts(
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed",
    );
    return counts;
  } catch (err) {
    console.error(err);
  }
  return new Error("no data is there"); //const deadLetterJobs = await FailedJob.countDocuments();
}
module.exports = getMetrics;
