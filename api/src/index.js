//dotenv configuration

//path resolution
const path = require("path");
//dotenv configuration
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
  debug: false,
});

const express = require("express");
const app = express();

//importing queue
const emailQueue = require("./queue");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
for (let i = 0; i <= 10; i++) {
  emailQueue.add("send-email", {
    data: "hiii",
  });
}
// app.post("/email", async (req, res) => {
//   console.log(req.body);
//   try {
//     const { to, subject, body } = req.body;

//     if (!to || !subject || !body) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     const job = await emailQueue.add("send-email", req.body, {
//       attempts: 3,
//       backoff: {
//         type: "fixed",
//         delay: 3000,
//       },
//     });
//     res.status(201).sendFile(path.resolve(__dirname, "../successmail.html"));
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
app.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
