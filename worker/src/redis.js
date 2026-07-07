const redis = require("ioredis");
require("dotenv").config();
const connection = new redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});
module.exports = connection;
