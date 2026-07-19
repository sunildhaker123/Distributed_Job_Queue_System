//path resolution
const path = require("path");
//dotenv configuration
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
  debug: false,
});

const http = require("http");
const app = require("./app");
require("./queue/queueEvents");
const connectDb = require("./config/db");
const server = http.createServer(app);
const { initSocket } = require("./socket/index");

initSocket(server);

async function startServer() {
  try {
    await connectDb();
    server.listen(process.env.PORT, () => {
      console.log(`server is running at http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}
startServer();
