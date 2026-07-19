const express = require("express");
const failedJobsRouter = express.Router();
const FailedJob = require("../models/FailedJob.model");
const emailQueue = require("../queue/email.queue");

async function getFailedJobs() {
  const failedJobs = await FailedJob.find().lean();
  return failedJobs.map((job) => ({
    id: job._id,
    originalJobId: job.originalJobId,
    payload: job.payload,
    failedReason: job.failedReason,
    status: job.status,
    failedAt: job.failedAt,
  }));
}

async function retryFailedJobs(jobId) {
  try {
    const failedJob = await FailedJob.findOne({
      originalJobId: jobId.toString(),
    });
    if (failedJob.length == 0) {
      throw new Error("Job doesnt exists");
    }
    const newJob = await emailQueue.add("send-mail", failedJob.payload);
    failedJob.retryCount = (failedJob.retryCount || 0) + 1;
    failedJob.retriedJobsId.push(newJob.id.toString());

    failedJob.lastRetriedAt = new Date();

    failedJob.status = "retried";

    await failedJob.save();

    return newJob;
  } catch (err) {
    console.error(err);
    throw new Error("retry unsuccessfull");
  }
}

failedJobsRouter.get("/", async (req, res) => {
  try {
    const jobs = await getFailedJobs();
    return res.json(jobs);
  } catch (err) {
    console.error(err);
  }
  return res.status(500).json({
    message: "Unable to fetch failed jobs",
  });
});

failedJobsRouter.get("/:id/retry", async (req, res) => {
  try {
    const job = await retryFailedJobs(req.params.id);
    return res.json({
      message: "Retry initiated",
      jobId: job.id,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = failedJobsRouter;
