document.addEventListener("DOMContentLoaded", () => {

  // --- Background Music Autoplay Logic ---
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const voiceAudio = document.getElementById("voice1");
  let isPlaying = false;
  let wasBgMusicPlayingBeforeVN = false;

  // Ensure audio skips the first 5 seconds the moment it starts playing
  bgMusic.addEventListener("play", () => {
    if (bgMusic.currentTime < 5) {
      bgMusic.currentTime = 5;
    }
  });

  function startMusic() {
    if (!isPlaying) {
      bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = "⏸ Pause Song";
      }).catch(err => {
        console.log("Autoplay waiting for first click:", err);
      });
    }
  }

  // Attempt instant play on load
  startMusic();

  // Play immediately on first user click anywhere on screen
  document.body.addEventListener("click", () => {
    startMusic();
  }, { once: true });

  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isPlaying) {
      bgMusic.play();
      musicToggle.textContent = "⏸ Pause Song";
      isPlaying = true;
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🎵 Play Song";
      isPlaying = false;
    }
  });

  // --- Audio Sync: Resume Background Music when Voice Note Ends/Pauses ---
  if (voiceAudio) {
    voiceAudio.addEventListener("ended", () => {
      if (wasBgMusicPlayingBeforeVN) {
        bgMusic.play();
        isPlaying = true;
        musicToggle.textContent = "⏸ Pause Song";
      }
    });

    voiceAudio.addEventListener("pause", () => {
      if (voiceAudio.paused && voiceAudio.currentTime < voiceAudio.duration && wasBgMusicPlayingBeforeVN) {
        bgMusic.play();
        isPlaying = true;
        musicToggle.textContent = "⏸ Pause Song";
      }
    });
  }

  // --- Gate Page & Stages Navigation Logic ---
  const gateStage = document.getElementById("gate-stage");
  const notReadyStage = document.getElementById("not-ready-stage");
  const cakeStage = document.getElementById("cake-stage");
  const heroStage = document.getElementById("hero-stage");
  
  const readyYesBtn = document.getElementById("readyYesBtn");
  const readyNoBtn = document.getElementById("readyNoBtn");
  const tryAgainBtn = document.getElementById("tryAgainBtn");
  const blowCandlesBtn = document.getElementById("blowCandlesBtn");
  const proceedToEnvelopeBtn = document.getElementById("proceedToEnvelopeBtn");

  readyYesBtn.addEventListener("click", () => {
    startMusic();
    gateStage.classList.add("hidden");
    cakeStage.classList.remove("hidden");
  });

  readyNoBtn.addEventListener("click", () => {
    gateStage.classList.add("hidden");
    notReadyStage.classList.remove("hidden");
  });

  tryAgainBtn.addEventListener("click", () => {
    notReadyStage.classList.add("hidden");
    gateStage.classList.remove("hidden");
  });

  // --- Blow Out Candles Logic ---
  blowCandlesBtn.addEventListener("click", () => {
    const flames = document.querySelectorAll(".flame");
    flames.forEach(flame => flame.classList.add("extinguished"));
    
    // Confetti celebration
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

    blowCandlesBtn.classList.add("hidden");
    proceedToEnvelopeBtn.classList.remove("hidden");
  });

  proceedToEnvelopeBtn.addEventListener("click", () => {
    cakeStage.classList.add("hidden");
    heroStage.classList.remove("hidden");
  });

  // --- Envelope & Navigation Logic ---
  const mainEnvelope = document.getElementById("mainEnvelope");
  const unlockDeskBtn = document.getElementById("unlockDeskBtn");
  const deskStage = document.getElementById("desk-stage");

  mainEnvelope.addEventListener("click", () => {
    mainEnvelope.querySelector(".envelope").classList.toggle("open");
  });

  unlockDeskBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    heroStage.classList.add("hidden");
    deskStage.classList.remove("hidden");
    startBalloons();
  });

  // --- Polaroid Card Flip Logic ---
  const flipCards = document.querySelectorAll(".card-flip");
  flipCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  // --- Finale Modal & Scratch Card Logic ---
  const finaleBtn = document.getElementById("finaleBtn");
  const finaleModal = document.getElementById("finaleModal");
  const closeModal = document.getElementById("closeModal");
  const scratchCanvas = document.getElementById("scratchCanvas");
  const ctx = scratchCanvas.getContext("2d");
  let isScratching = false;

  finaleBtn.addEventListener("click", () => {
    finaleModal.classList.remove("hidden");
    initScratchCard();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  });

  closeModal.addEventListener("click", () => {
    finaleModal.classList.add("hidden");
  });

  function initScratchCard() {
    ctx.fillStyle = "#6d28d9";
    ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    ctx.font = "bold 20px Chewy";
    ctx.fillStyle = "#f1f5f9";
    ctx.textAlign = "center";
    ctx.fillText("Scratch Me! ✨", scratchCanvas.width / 2, scratchCanvas.height / 2);
  }

  function scratch(e) {
    if (!isScratching) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  scratchCanvas.addEventListener("mousedown", () => isScratching = true);
  scratchCanvas.addEventListener("mouseup", () => isScratching = false);
  scratchCanvas.addEventListener("mousemove", scratch);

  scratchCanvas.addEventListener("touchstart", () => isScratching = true);
  scratchCanvas.addEventListener("touchend", () => isScratching = false);
  scratchCanvas.addEventListener("touchmove", scratch);

  // --- Send Hug Logic ---
  const sendHugBtn = document.getElementById("sendHugBtn");
  const hugResponse = document.getElementById("hugResponse");

  sendHugBtn.addEventListener("click", () => {
    hugResponse.classList.remove("hidden-text");
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
  });

  // --- Balloon Generator ---
  function startBalloons() {
    const colors = ["#8b5cf6", "#a78bfa", "#cbd5e1", "#6d28d9"];
    setInterval(() => {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.left = Math.random() * 90 + "vw";
      balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animationDuration = (Math.random() * 3 + 6) + "s";
      document.body.appendChild(balloon);

      balloon.addEventListener("click", () => {
        balloon.remove();
        confetti({ particleCount: 20, spread: 40 });
      });

      setTimeout(() => balloon.remove(), 9000);
    }, 1800);
  }

  // --- Heart Trail Cursor FX ---
  let lastX = 0, lastY = 0;
  document.addEventListener("mousemove", (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist > 35) {
      lastX = e.clientX;
      lastY = e.clientY;
      const heart = document.createElement("div");
      heart.classList.add("heart-trail");
      heart.innerHTML = "💜";
      heart.style.left = e.clientX + "px";
      heart.style.top = e.clientY + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  });

  // Attach global functions to window
  window.toggleVoiceNote = function(audioId) {
    const voice = document.getElementById(audioId);
    const bg = document.getElementById("bgMusic");
    const toggleBtn = document.getElementById("musicToggle");

    if (voice.paused) {
      wasBgMusicPlayingBeforeVN = !bg.paused;
      
      if (wasBgMusicPlayingBeforeVN) {
        bg.pause();
        toggleBtn.textContent = "🎵 Play Song";
      }

      voice.play();
    } else {
      voice.pause();
    }
  };
});

// Global Function for Reason Tokens
function revealReason(element) {
  element.classList.add("revealed");
  const text = element.querySelector(".reason-text");
  if (text) text.classList.remove("hidden-text");
}
