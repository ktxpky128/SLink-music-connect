// === 模擬提示音 ===
function playChime() {
  const audio = new Audio('chime.mp3'); // 你上傳音效後放這裡
  audio.play();
  alert("提示音響起 🎵 附近有人與你聽同一首歌！");
}

// === 共聽室聊天 ===
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("userMessage");
  const chatWindow = document.getElementById("chatWindow");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (text) {
        const msg = document.createElement("div");
        msg.className = "message";
        msg.textContent = "你：" + text;
        chatWindow.appendChild(msg);
        input.value = "";
        chatWindow.scrollTop = chatWindow.scrollHeight;
        // 模擬回覆
        setTimeout(() => {
          const reply = document.createElement("div");
          reply.className = "message";
          reply.textContent = "🎧 系統回覆：真巧，我也喜歡這首歌！";
          chatWindow.appendChild(reply);
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
      }
    });
  }
});
