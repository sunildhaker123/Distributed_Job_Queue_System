const socket = io("http://localhost:4000");
socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("job:update", ({ jobId, state }) => {
  console.log(jobId, state);
  document.getElementById("status").innerText = `Job ${jobId}: ${state}`;
  if (state === "completed") {
    // setTimeout(() => {
    //   document.getElementById("status").innerHTML = "";
    // }, 3000);
    socket.emit("unsubscribe-job", jobId);
  }
});
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:4000/api/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: document.getElementById("to").value,
      subject: document.getElementById("subject").value,
      body: document.getElementById("body").value,
    }),
  });

  const data = await response.json();

  console.log(data);

  socket.emit("subscribe-job", data.jobid);
});
