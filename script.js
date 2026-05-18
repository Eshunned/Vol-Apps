document.addEventListener('DOMContentLoaded', () => {
  console.log("⚡ SYSTEM FEED ONLINE. Cryptographic keys verified. ⚡");

  const card = document.getElementById('interactive-card');
  const memeAudio = document.getElementById('meme-audio');

  if (card) {
    card.addEventListener('click', () => {
      card.classList.toggle('open');

      if (card.classList.contains('open')) {
        if (memeAudio) {
          memeAudio.currentTime = 0;
          memeAudio.play().catch(() => { });
        }
      } else {
        if (memeAudio) {
          memeAudio.pause();
          memeAudio.currentTime = 0;
        }
      }
    });
  }

  // 2. VHS Live Clock and Play Timer HUD (on the card's front cover)
  const vhsClock = document.getElementById('vhs-clock');
  const vhsDateTime = document.getElementById('vhs-date-time');
  const vhsDate = document.getElementById('vhs-date');

  let startTime = Date.now();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const updateVHSTimer = () => {
    const now = new Date();

    // A. Playback counter (counting up from 00:00:00 since page load)
    if (vhsClock) {
      const elapsedMs = Date.now() - startTime;
      const totalSecs = Math.floor(elapsedMs / 1000);
      const hours = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
      const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
      const secs = (totalSecs % 60).toString().padStart(2, '0');
      vhsClock.textContent = `${hours}:${mins}:${secs}`;
    }

    // B. Live date (e.g. MAY 18, 2026)
    if (vhsDate) {
      const day = now.getDate().toString().padStart(2, '0');
      vhsDate.textContent = `${months[now.getMonth()]} ${day}, ${now.getFullYear()}`;
    }

    // C. Live clock timestamp (e.g. HH:MM:SS)
    if (vhsDateTime) {
      const hh = now.getHours().toString().padStart(2, '0');
      const mm = now.getMinutes().toString().padStart(2, '0');
      const ss = now.getSeconds().toString().padStart(2, '0');
      vhsDateTime.textContent = `${hh}:${mm}:${ss}`;
    }
  };

  // Tick immediately and update every second
  updateVHSTimer();
  setInterval(updateVHSTimer, 1000);

  // 3. Dynamic Matrix Code Rain Canvas Effect
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cyber characters
    const katakana = "01010101⚡💻💾📁👾👽🔌🛸⚔️🤖🌐";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characters = katakana + alphabet;

    const fontSize = 14;
    let columns = canvas.width / fontSize;

    let rainDrops = [];
    const initDrops = () => {
      columns = canvas.width / fontSize;
      rainDrops = [];
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100;
      }
    };
    initDrops();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initDrops();
      }, 200);
    });

    const draw = () => {
      ctx.fillStyle = 'rgba(6, 8, 15, 0.12)'; // Matches CSS --bg-dark
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        if (rainDrops[i] < 0 && Math.random() < 0.5) {
          rainDrops[i]++;
          continue;
        }

        const char = characters.charAt(Math.floor(Math.random() * characters.length));

        const roll = Math.random();
        if (roll > 0.98) {
          ctx.fillStyle = '#ffffff'; // White lead
        } else if (roll > 0.88) {
          ctx.fillStyle = '#00e5ff'; // Cyan accent
        } else {
          ctx.fillStyle = '#00ff66'; // Primary neon green
        }

        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    setInterval(draw, 33);
  }
});
