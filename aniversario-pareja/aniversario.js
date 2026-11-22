(function(){var d=window.DATOS;document.querySelectorAll("[data-t]").forEach(function(e){var v=d[e.getAttribute("data-t")];if(v!==undefined&&v!==null){e.textContent=v;e.style.whiteSpace="pre-line";}});if(d.titulo)document.title=d.titulo;})();

    const _f = DATOS.inicio.split("-").map(Number);
    const startDate = new Date(_f[0], _f[1] - 1, _f[2]);

    function createHearts() {
      const container = document.getElementById('heartsBg');
      for (let i = 0; i < 22; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = Math.random() > 0.5 ? '♥' : '♡';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (9 + Math.random() * 11) + 's';
        heart.style.animationDelay = Math.random() * 7 + 's';
        heart.style.fontSize = (13 + Math.random() * 16) + 'px';
        container.appendChild(heart);
      }
    }
    createHearts();

    function updateCounter() {
      const now = new Date();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    function goTo(id) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');

      if (id === 'letter') {
        setTimeout(() => {
          document.getElementById('letterText').classList.add('visible');
        }, 280);
      } else {
        document.getElementById('letterText').classList.remove('visible');
      }

      if (id === 'final') {
        launchConfetti();
      }
    }

    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    let confettiPieces = [];
    let animationId = null;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function createConfettiPiece() {
      const colors = DATOS.confeti;
      const shapes = ['circle', 'rect', 'heart'];
      return {
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 80,
        size: 6 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        speedY: 2.2 + Math.random() * 3.8,
        speedX: -2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: -3.5 + Math.random() * 7,
        opacity: 0.75 + Math.random() * 0.25
      };
    }

    function drawHeart(ctx, x, y, size, color) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.fill();
      ctx.restore();
    }

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach((p, index) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'heart') {
          drawHeart(ctx, 0, -p.size / 2, p.size, p.color);
        }
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 30) {
          confettiPieces.splice(index, 1);
        }
      });

      if (confettiPieces.length > 0) {
        animationId = requestAnimationFrame(drawConfetti);
      } else {
        animationId = null;
      }
    }

    function launchConfetti() {
      confettiPieces = [];
      if (animationId) cancelAnimationFrame(animationId);

      for (let i = 0; i < 170; i++) confettiPieces.push(createConfettiPiece());
      setTimeout(() => { for (let i = 0; i < 90; i++) confettiPieces.push(createConfettiPiece()); }, 550);
      setTimeout(() => { for (let i = 0; i < 70; i++) confettiPieces.push(createConfettiPiece()); }, 1100);

      drawConfetti();
    }

    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    if (DATOS.musica) bgMusic.src = DATOS.musica;
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
      if (!bgMusic.src || bgMusic.src === window.location.href) {
        alert('Para activar la música, agrega un archivo .mp3.');
        return;
      }
      if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '♪';
      } else {
        bgMusic.play();
        musicBtn.textContent = '❚❚';
      }
      isPlaying = !isPlaying;
    });
  
(function(){var L=document.getElementById("letterText");
DATOS.parrafos.forEach(function(t){var p=document.createElement("p");p.textContent=t;L.appendChild(p);});
var f=document.createElement("p");f.style.cssText="margin-top: 1.4rem; font-style: italic; color: #1a5c45;";f.textContent=DATOS.firma;L.appendChild(f);
if(DATOS.foto){document.getElementById("fotoImg").src=DATOS.foto;}else{document.getElementById("marcoFoto").style.display="none";}})();
