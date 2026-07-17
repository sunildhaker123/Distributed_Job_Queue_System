const { Queue } = require("bullmq");
const connection = require("../config/redis");

const emailQueue = new Queue("emails", {
  connection,
});

module.exports = emailQueue;
