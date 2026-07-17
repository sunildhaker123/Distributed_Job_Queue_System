const { getIO } = require("../socket");

function emitJobUpdate(jobId, state, reason = null) {
  const io = getIO();

  io.to(jobId.toString()).emit("job:update", {
    jobId,
    state,
    reason,
  });
}

module.exports = {
  emitJobUpdate,
};
