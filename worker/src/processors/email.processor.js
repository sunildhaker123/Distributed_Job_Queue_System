const processEmail = async (job) => {
  // console.log(`Job started with Job ID : ${job.id}`);
  console.log(`[${new Date().toLocaleTimeString()}] START ${job.id}`);
  if (job.attemptsStarted <= 3) {
    await setTimeout(() => {}, 2000);
    throw new Error("Job Execution Fail");
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  console.log(`Email sent successfully!`);
  console.log(`[${new Date().toLocaleTimeString()}] END ${job.id}`);
};
module.exports = processEmail;
