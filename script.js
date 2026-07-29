// 1. Interactive Cursor Trail (Refined Palette)
document.addEventListener('mousemove', function(e) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = e.clientX + 'px';
  sparkle.style.top = e.clientY + 'px';
  
  const colors = ['#d4a373', '#b67e5a', '#f8e1db', '#e8d0c9'];
  sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
  
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

// 2. Floating Balloons & Pop Mechanic (Refined Palette)
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * 90 + 'vw';
  
  const colors = ['#f8e1db', '#f2ddd6', '#e8d0c9', '#d4a373'];
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
  
  balloon.addEventListener('click', function() {
    balloon.style.transform = 'scale(1.5)';
    balloon.style.opacity = '0';
    setTimeout(() => balloon.remove(), 200);
  });

  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 10000);
}
setInterval(createBalloon, 2500);

// 3. Audio Player Toggle
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.innerText = '⏸ Pause Song';
  } else {
    bgMusic.pause();
    musicBtn.innerText = '🎵 Play Song';
  }
});

// 4. Envelope Opening & Unlocking Desk
const mainEnvelope = document.getElementById('mainEnvelope');
const unlockDeskBtn = document.getElementById('unlockDeskBtn');
const deskStage = document.getElementById('desk-stage');

mainEnvelope.addEventListener('click', () => {
  mainEnvelope.querySelector('.envelope').classList.add('open');
});

unlockDeskBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  deskStage.classList.remove('hidden');
  deskStage.scrollIntoView({ behavior: 'smooth' });
});

// 5. Flip Cards Mechanic
document.querySelectorAll('.card-flip').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// 6. Voice Note Toggle
function toggleVoiceNote(id) {
  const audio = document.getElementById(id);
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// 7. Finale Confetti & Gift Reveal Modal
const finaleBtn = document.getElementById('finaleBtn');
const finaleModal = document.getElementById('finaleModal');
const closeModal = document.getElementById('closeModal');
const giftBox = document.getElementById('giftBox');

finaleBtn.addEventListener('click', () => {
  finaleModal.classList.remove('hidden');
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#d4a373', '#b67e5a', '#f8e1db']
  });
});

closeModal.addEventListener('click', () => {
  finaleModal.classList.add('hidden');
});

giftBox.addEventListener('click', () => {
  giftBox.innerHTML = "<h3>🎟️ Trip / Concert Tickets!</h3><p>(Replace this with your real gift details!)</p>";
});
