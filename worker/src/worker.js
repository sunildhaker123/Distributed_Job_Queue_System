const { Worker } = require("bullmq");
const connection = require("./config/redis");
const processEmail = require("./processors/email.processor");

const emailWorker = new Worker("emails", (job) => processEmail(job), {
  connection,
  concurrency: 1,
});
