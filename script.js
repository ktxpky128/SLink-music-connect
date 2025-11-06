document.addEventListener("DOMContentLoaded", function () {
  const soundBtn = document.getElementById("soundBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const audio = new Audio("sound.mp3");
      audio.play();
      alert("提示音響起！附近有人也在聽這首歌 🎶");
    });
  }
});
