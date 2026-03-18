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
