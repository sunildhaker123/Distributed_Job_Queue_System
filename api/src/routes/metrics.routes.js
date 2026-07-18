const express = require("express");
const metricsRouter = express.Router();
const getMetricsHandler = require("../controllers/metrics.controller");
metricsRouter.get("/", (req, res) => getMetricsHandler(req, res));

module.exports = metricsRouter;
