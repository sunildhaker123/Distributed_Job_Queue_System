const mongoose = require("mongoose");

const failedJobSchema = new mongoose.Schema(
  {
    originalJobId: {
      type: String,
      required: true,
      unique: true,
    },

    queueName: {
      type: String,
      required: true,
    },

    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    failedReason: {
      type: String,
      required: true,
    },

    attemptsMade: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "retried"],
      default: "pending",
    },

    failedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
const FailedJob = mongoose.model("FailedJob", failedJobSchema);
module.exports = FailedJob;
