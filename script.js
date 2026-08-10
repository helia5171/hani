// ====== اسکریپت کامل با موسیقی ======

// ====== کنترل موسیقی ======
const music = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggle');
let isMusicPlaying = true;

if (music) {
  music.volume = 0.3; // صدای آروم 30%
  
  // تلاش برای پخش خودکار
  music.play().catch(function(error) {
    console.log('پخش خودکار ممکن نیست، کاربر باید کلیک کنه');
  });
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', function() {
    if (isMusicPlaying) {
      music.pause();
      this.textContent = '🔇';
      this.style.color = '#999';
      this.style.borderColor = '#999';
    } else {
      music.play().catch(() => {});
      this.textContent = '🔊';
      this.style.color = '#ff6b8a';
      this.style.borderColor = '#ff6b8a';
    }
    isMusicPlaying = !isMusicPlaying;
  });
}

// ====== کدهای قبلی شما ======
const envelope = document.getElementById('envelopeBtn');
const envScreen = document.getElementById('envelope');
const app = document.getElementById('app');
const pages = [...document.querySelectorAll('.page')];
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const dots = document.getElementById('dots');
let i = 0;

function openEnvelope() {
  envelope.classList.add('open');
  setTimeout(() => {
    envScreen.classList.add('hidden');
    app.classList.remove('hidden');
    render();
  }, 1150);
}

envelope.onclick = openEnvelope;
envelope.onkeydown = e => {
  if (e.key === 'Enter' || e.key === ' ') openEnvelope();
};

pages.forEach((_, n) => {
  const d = document.createElement('span');
  d.className = 'dot';
  d.onclick = () => go(n);
  dots.appendChild(d);
});

function render() {
  pages.forEach((p, n) => p.classList.toggle('active', n === i));
  [...dots.children].forEach((d, n) => d.classList.toggle('on', n === i));
  prev.disabled = i === 0;
  next.disabled = i === pages.length - 1;
}

function go(n) {
  i = Math.max(0, Math.min(pages.length - 1, n));
  render();
}

next.onclick = () => go(i + 1);
prev.onclick = () => go(i - 1);

document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(Number(b.dataset.go)));

// ====== سورپرایز کیک با افکت بهتر ======
function doSurprise() {
  alert('🎉 تولدت مبارک هانی جان! 🎉\n\nامیدوارم همیشه شاد و سالم باشی! ❤️');
  
  const cakeImg = document.getElementById('cakeBtn');
  if (cakeImg) {
    cakeImg.style.transform = 'scale(1.3)';
    cakeImg.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      cakeImg.style.transform = 'scale(1)';
    }, 500);
  }
}

document.getElementById('cakeHit').onclick = doSurprise;
document.getElementById('cakeBtn').onclick = doSurprise;

// ====== تاچ و کیبورد ======
let sx = 0;
app.addEventListener('touchstart', e => sx = e.changedTouches[0].screenX, { passive: true });
app.addEventListener('touchend', e => {
  let dx = e.changedTouches[0].screenX - sx;
  if (Math.abs(dx) > 45) dx < 0 ? go(i + 1) : go(i - 1);
}, { passive: true });

document.addEventListener('keydown', e => {
  if (app.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    go(i + 1);
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    go(i - 1);
  }
});

// ====== رندر اولیه ======
render();
