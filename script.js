/* ========================================================
   ARKA'S BIRTHDAY & 6-MONTH ANNIVERSARY JAVASCRIPT MAGIC
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initConfettiCanvas();
  initLoveCounter();
  initEnvelope();
  initCake();
  initPolaroids();
  initLoveButton();
  initMusicPlayer();
});

/* ========================================================
   1. LIVE LOVE COUNTER (6 MONTHS MILESTONE)
   Relationship started April 28, 2026
   ======================================================== */
function initLoveCounter() {
  // Start date: 6 months before Oct 28, 2026 (April 28, 2026)
  const relationshipStart = new Date('2026-04-28T00:00:00');

  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');

  function updateCounter() {
    const now = new Date();
    const diffMs = Math.max(0, now - relationshipStart);

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

/* ========================================================
   2. FLOATING BACKGROUND HEARTS & SPARKLES CANVAS
   ======================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const heartShapes = ['❤️', '💖', '💕', '✨', '🌸', '🤍'];
  const maxParticles = 24;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 12;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5 - 0.25;
      this.shape = heartShapes[Math.floor(Math.random() * heartShapes.length)];
      this.opacity = Math.random() * 0.45 + 0.25;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
      this.swingPhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.swingPhase += this.swingSpeed;
      this.x += Math.sin(this.swingPhase) * 0.6 + this.speedX;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px serif`;
      ctx.fillText(this.shape, this.x, this.y);
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================
   3. INTERACTIVE WAX-SEAL ENVELOPE
   ======================================================== */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const closeBtn = document.getElementById('closeLetterBtn');

  function openLetter(e) {
    if (e) e.stopPropagation();
    if (!envelope.classList.contains('is-open')) {
      envelope.classList.add('is-open');
      playChimeSound();
      triggerConfetti(60);
    }
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', openLetter);
  }

  if (envelope) {
    envelope.addEventListener('click', openLetter);
  }

  if (closeBtn && envelope) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      envelope.classList.remove('is-open');
    });
  }
}

/* ========================================================
   4. INTERACTIVE BIRTHDAY CAKE & CANDLE BLOWOUT
   ======================================================== */
function initCake() {
  const blowBtn = document.getElementById('blowCandlesBtn');
  const candlesRow = document.getElementById('candlesRow');
  const wishMessage = document.getElementById('wishMessage');

  let isBlown = false;

  if (blowBtn && candlesRow) {
    blowBtn.addEventListener('click', () => {
      if (isBlown) {
        // Relight option
        candlesRow.classList.remove('candles-blown');
        const candles = candlesRow.querySelectorAll('.candle');
        candles.forEach((c) => c.classList.remove('blown'));
        wishMessage.classList.add('hidden');
        blowBtn.innerHTML = '<span>💨</span> Blow Out the Candles!';
        isBlown = false;
        return;
      }

      // Blow out candles
      candlesRow.classList.add('candles-blown');
      const candles = candlesRow.querySelectorAll('.candle');
      candles.forEach((c, idx) => {
        setTimeout(() => c.classList.add('blown'), idx * 80);
      });

      playCelebrationChime();
      triggerConfetti(180);

      if (wishMessage) {
        wishMessage.classList.remove('hidden');
      }

      blowBtn.innerHTML = '<span>✨</span> Relight the Candles!';
      isBlown = true;
    });
  }
}

/* ========================================================
   5. POLAROID CARD TAP (MOBILE FRIENDLY)
   ======================================================== */
function initPolaroids() {
  const cards = document.querySelectorAll('.polaroid-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

/* ========================================================
   6. INFINITE LOVE BUTTON & TOAST MESSAGES
   ======================================================== */
function initLoveButton() {
  const loveBtn = document.getElementById('sendLoveBtn');
  const countDisplay = document.getElementById('loveCountNumber');
  const toastDisplay = document.getElementById('loveMessageToast');

  let loveCount = 6000000;
  const sweetNotes = [
    'Sending endless hugs to Arka! 🤗',
    'Arka, you are my happiest thought! ✨',
    'Falling in love with you all over again! 💖',
    'You make everything in life 1000x sweeter! 🍯',
    'Cannot wait for all our future years together! 🥂',
    'Holding your hand is my favorite feeling! 🤝',
    'Love level: Beyond infinity! 🚀💕',
    'Happy Birthday to my favorite human! 🎂'
  ];
  let noteIndex = 0;

  if (loveBtn && countDisplay) {
    loveBtn.addEventListener('click', (e) => {
      loveCount += 100000;
      countDisplay.textContent = loveCount.toLocaleString();

      if (toastDisplay) {
        toastDisplay.textContent = sweetNotes[noteIndex % sweetNotes.length];
        noteIndex++;
      }

      // Create burst of flying hearts from button
      const rect = loveBtn.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      for (let i = 0; i < 6; i++) {
        spawnFlyingHeart(originX, originY);
      }

      playPluckSound();
    });
  }
}

function spawnFlyingHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'flying-heart';
  const emojis = ['💖', '❤️', '💕', '💗', '💓', '🥰'];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  // Random drift
  const randX = (Math.random() - 0.5) * 160;
  const randXEnd = randX * 1.8;
  const randRot = (Math.random() - 0.5) * 40;
  const randRotEnd = (Math.random() - 0.5) * 90;

  heart.style.setProperty('--rand-x', `${randX}px`);
  heart.style.setProperty('--rand-x-end', `${randXEnd}px`);
  heart.style.setProperty('--rand-rot', `${randRot}deg`);
  heart.style.setProperty('--rand-rot-end', `${randRotEnd}deg`);

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1500);
}

/* ========================================================
   7. HIGH PERFORMANCE CANVAS CONFETTI
   ======================================================== */
let confettiParticles = [];
let confettiCtx = null;
let confettiAnimId = null;

function initConfettiCanvas() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  confettiCtx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function triggerConfetti(count = 100) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas || !confettiCtx) return;

  const colors = ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2', '#ff477e', '#ffffff', '#f5b041'];

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
      w: Math.random() * 9 + 5,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      gravity: 0.28,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1,
      decay: Math.random() * 0.006 + 0.005
    });
  }

  if (!confettiAnimId) {
    animateConfetti();
  }
}

function animateConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!confettiCtx || !canvas) return;

  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    p.opacity -= p.decay;

    if (p.opacity <= 0 || p.y > canvas.height) {
      confettiParticles.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.globalAlpha = p.opacity;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimId = null;
    confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ========================================================
   8. ROMANTIC AMBIENT MUSIC SYNTHESIZER (WEB AUDIO API)
   Generates a gentle, heartwarming romantic acoustic melody
   so it works immediately without external MP3 files!
   ======================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let melodyInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playNote(freq, startTime, duration = 0.8, type = 'sine', volume = 0.08) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Gentle romantic chords arpeggiator
function startRomanticMelody() {
  const ctx = getAudioContext();
  const chords = [
    [261.63, 329.63, 392.00, 523.25], // C major
    [220.00, 261.63, 329.63, 440.00], // A minor
    [174.61, 220.00, 261.63, 349.23], // F major
    [196.00, 246.94, 293.66, 392.00]  // G major
  ];

  let chordIndex = 0;

  function stepChord() {
    if (!isMusicPlaying) return;
    const chord = chords[chordIndex % chords.length];
    const now = ctx.currentTime;

    chord.forEach((note, noteIdx) => {
      playNote(note, now + noteIdx * 0.28, 1.2, 'sine', 0.05);
    });

    chordIndex++;
  }

  stepChord();
  melodyInterval = setInterval(stepChord, 1600);
}

function stopRomanticMelody() {
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
}

function initMusicPlayer() {
  const musicBtn = document.getElementById('musicToggleBtn');
  const customAudio = document.getElementById('customAudio');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (!isMusicPlaying) {
      isMusicPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.querySelector('.music-label').textContent = 'Playing 💕';

      if (customAudio) {
        const playPromise = customAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log('Custom audio play error or blocked, playing gentle melody fallback:', err);
            startRomanticMelody();
          });
        }
      } else {
        startRomanticMelody();
      }
    } else {
      isMusicPlaying = false;
      musicBtn.classList.remove('playing');
      musicBtn.querySelector('.music-label').textContent = 'Our Song';

      if (customAudio) {
        customAudio.pause();
      }
      stopRomanticMelody();
    }
  });
}

// Sound effects for interactions
function playChimeSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      playNote(freq, now + i * 0.1, 0.6, 'triangle', 0.06);
    });
  } catch (e) {
    // Audio context may require click, safe to ignore
  }
}

function playCelebrationChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      playNote(freq, now + i * 0.12, 0.9, 'triangle', 0.08);
    });
  } catch (e) {}
}

function playPluckSound() {
  try {
    const ctx = getAudioContext();
    playNote(587.33 + Math.random() * 200, ctx.currentTime, 0.35, 'sine', 0.04);
  } catch (e) {}
}
