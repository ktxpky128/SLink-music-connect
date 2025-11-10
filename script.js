function playChime() {
  alert("提示音響起！附近有人也在聽這首歌 🎶");
}

function openRoom(name) {
  document.querySelector(".room-list").classList.add("hidden");
  const room = document.getElementById("chatRoom");
  room.classList.remove("hidden");
  document.getElementById("chatTitle").innerText = "🎧 " + name;
  document.getElementById("messages").innerHTML = "";
}

function leaveRoom() {
  document.getElementById("chatRoom").classList.add("hidden");
  document.querySelector(".room-list").classList.remove("hidden");
}

function sendMessage(event) {
  if (event.key === "Enter") {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (text) {
      const msg = document.createElement("div");
      msg.innerText = "你：" + text;
      document.getElementById("messages").appendChild(msg);
      input.value = "";
    }
  }
}
