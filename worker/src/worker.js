const { Worker } = require("bullmq");
const connection = require("./redis");

const emailWorker = new Worker(
  "emails",
  async (job) => {
    console.log(`Job received with id ${job.id}`);

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    console.log("Email sent successfully!");
  },
  {
    connection,
  },
);
