const { getIO } = require("../socket");

function emitJobUpdate(jobId, state, reason = null) {
  const io = getIO();

  if (!io) return;

  const payload = {
    jobId,
    state,
    reason,
  };

  io.emit("job:update", payload);
}

module.exports = {
  emitJobUpdate,
};
