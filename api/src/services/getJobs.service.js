const emailQueue = require("../queue/email.queue.js");
async function getJobs(state, page = 1, limit = 20) {
  const start = (page - 1) * limit;

  const end = start + limit - 1;

  return await emailQueue.getJobs([state], start, end);
}
module.exports = getJobs;
