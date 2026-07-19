const express = require("express");
const jobRouter = express.Router();
const getJobsHandler = require("../controllers/getJobs.controller");
const emailQueue = require("../queue/email.queue");

jobRouter.get("/", getJobsHandler);
jobRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Job id is required" });

    // Attempt to fetch the job from the queue
    const job = await emailQueue.getJob(id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    // Collect useful job information
    const state = await job.getState();
    const progress = job._progress || job.progress || 0;
    const attemptsMade = job.attemptsMade || 0;
    const failedReason = job.failedReason || null;
    const returnvalue = job.returnvalue || null;

    return res.json({
      id: job.id,
      name: job.name,
      data: job.data,
      state,
      progress,
      attemptsMade,
      failedReason,
      returnvalue,
      timestamp: job.timestamp || null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = jobRouter;
