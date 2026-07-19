const emailQueue = require("../queue/email.queue");

async function getMetrics() {
  return emailQueue.getJobCounts(
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed",
  );
}

module.exports = getMetrics;
