// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
    document.body.style.overflow = '';
    animateOnScroll();
  }, 2200);
});
document.body.style.overflow = 'hidden';

// ===== THEME TOGGLE =====
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('ngala-theme') || 'light';
html.setAttribute('data-theme', saved);
themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ngala-theme', next);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== NAV ACTIVE & PROGRESS =====
const navLinks = document.querySelectorAll('.nav-links a');
const navProgress = document.getElementById('nav-progress');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  navProgress.style.width = pct + '%';

  backTop.classList.toggle('show', window.scrollY > 400);

  const sections = document.querySelectorAll('section[id]');
  let active = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) active = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + active);
  });
});

// ===== REVEAL ON SCROLL =====
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));

  // skill bars separate observer
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        barObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const skillBarsEl = document.getElementById('skillBars');
  if (skillBarsEl) barObs.observe(skillBarsEl);
}

// ===== MATRIX CANVAS =====
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let cols, drops;

function initMatrix() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 12;
  cols  = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
}
initMatrix();
window.addEventListener('resize', initMatrix);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00e87a';
  ctx.font = '12px JetBrains Mono';
  for (let i = 0; i < drops.length; i++) {
    const char = Math.random() > 0.5 ? '1' : '0';
    ctx.fillText(char, i * 12, drops[i] * 12);
    if (drops[i] * 12 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 80);