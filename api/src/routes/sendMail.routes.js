const express = require("express");
const sendMailRouter = express.Router();
const emailQueue = require("../queue/email.queue");
sendMailRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const job = await emailQueue.add("send-email", req.body, {
      attempts: 3,
      backoff: {
        type: "fixed",
        delay: 3000,
      },
    });
    // res.status(201).sendFile(path.resolve(__dirname, "../successmail.html"));
    res.status(201).json({
      jobid: job.id,
      message: "Job added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = sendMailRouter;
