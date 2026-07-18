const getMetrics = require("../services/getJobs.service");

async function getMetricsHandler(req, res) {
  try {
    const data = await getMetrics();
    return res.status(201).json(data);
  } catch (err) {
    console.error(err);
  }
  return res.json({
    message: "coudnt get data",
  });
}
module.exports = getMetricsHandler;
