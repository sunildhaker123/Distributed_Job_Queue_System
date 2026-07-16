const mongoose = require("mongoose");

require("dotenv").config({
  path: "../../.env",
  quiet: true,
  debug: false,
});
module.exports = async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connection successful");
  } catch (err) {
    console.log(err);
  }
};
