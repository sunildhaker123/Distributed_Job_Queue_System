const express = require("express");
const app = express();
const cors = require("cors");
const metricsRouter = require("./routes/metrics.routes");
const jobRouter = require("./routes/job.routes");
const sendMailRouter = require("./routes/sendMail.routes");
const failedJobsRouter = require("./routes/failedJobs.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobRouter);
app.use("/api/send-mail", sendMailRouter);
app.use("/api/failed-jobs", failedJobsRouter);
app.use("/api/metrics", metricsRouter);

module.exports = app;
