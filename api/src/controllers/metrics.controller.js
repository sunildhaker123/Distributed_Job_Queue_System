const getMetrics = require("../services/metrics.service");

async function getMetricsHandler(req, res) {
  try {
    const data = await getMetrics();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
  return res.status(500).json({
    message: "Couldn't get metrics",
  });
}
module.exports = getMetricsHandler;
