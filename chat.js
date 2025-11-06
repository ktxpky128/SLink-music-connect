document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("userMessage");
  const chatWindow = document.getElementById("chatWindow");

  function addMessage(text, sender = "user") {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    const msg = input.value.trim();
    if (msg !== "") {
      addMessage(msg, "user");
      input.value = "";

      setTimeout(() => {
        addMessage("🎧 對方正在聽同一首歌，也想說：「" + msg + "！」", "other");
      }, 1000);
    }
  });
});
