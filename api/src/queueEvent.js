const { QueueEvents } = require("bullmq");
const connection = require("./redis");
const queueEvent = new QueueEvents("emails", {
  connection,
});
async function init() {
  await queueEvent.waitUntilReady();
  console.log("queueEvent Connected Successfully");
}
init();
module.exports = queueEvent;
