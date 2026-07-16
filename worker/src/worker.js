const { Worker } = require("bullmq");
const connection = require("./redis");
// console.log(typeof connection);
// console.log(connection);
const emailWorker = new Worker(
  "emails",
  async (job) => {
    // console.log(`Job started with Job ID : ${job.id}`);
    console.log(`[${new Date().toLocaleTimeString()}] START ${job.id}`);
    if (job.attemptsStarted <= 3) throw new Error("job execution failed");

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    console.log(`Email sent successfully!`);
    console.log(`[${new Date().toLocaleTimeString()}] END ${job.id}`);
  },
  {
    connection,
    concurrency: 1,
  },
);
// emailWorker.on("completed", (job) => {
//   console.log(`✅ Job ${job.id} completed`);
// });

// emailWorker.on("failed", (job, err) => {
//   console.log(`❌ Job ${job.id} failed`);
//   console.log(err.message);
// });
