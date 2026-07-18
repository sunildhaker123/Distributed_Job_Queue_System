const getJobs = require("../services/getJobs.service.js");
async function getJobsHandler(req, res) {
  try {
    const { state, page, limit } = req.query;
    const jobs = await getJobs(state, page, limit);

    return res.json(jobs);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Couldn't fetch jobs",
    });
  }
}
module.exports = getJobsHandler;
