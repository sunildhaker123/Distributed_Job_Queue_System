const express = require("express");
const jobRouter = express.Router();
const getJobsHandler = require("../controllers/getJobs.controller");
jobRouter.get("/", getJobsHandler);
module.exports = jobRouter;
