const { QueueEvents } = require("bullmq");
const connection = require("./redis");
const queueEvent = new QueueEvents("emails", {
  connection,
});
queueEvent.on("completed", ({ jobId }) => {
  console.log(`${jobId} job completed `);
});
async function init() {
  await queueEvent.waitUntilReady();
  console.log("queueEvent Connected Successfully");
}
init();
module.exports = queueEvent;
