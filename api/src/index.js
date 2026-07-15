//path resolution
const path = require("path");
//dotenv configuration
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
  debug: false,
});

const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const { initSocket } = require("./socket/index");
//importing queue
const server = http.createServer(app);
initSocket(server);
const emailQueue = require("./queue");
require("./queEvents/queueEvent");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.status(201).sendFile(path.resolve(__dirname, "../index.html"));
// });
app.post("/api/send-mail", async (req, res) => {
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
app.get("/jobs/:id", async (req, res) => {
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
server.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
