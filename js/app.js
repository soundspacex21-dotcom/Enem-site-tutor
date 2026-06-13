/* ===== THEME ===== */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').className = isDark ? 'ti ti-sun' : 'ti ti-moon';
}

/* ===== SIDEBAR MOBILE ===== */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
}

/* ===== PROGRESS ===== */
function updateProgress() {
  const studied = JSON.parse(localStorage.getItem('studied') || '[]');
  const total = 116;
  const pct = Math.round((studied.length / total) * 100);
  const bar = document.getElementById('global-progress');
  const label = document.getElementById('global-pct');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : '');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = saved === 'dark' ? 'ti ti-moon' : 'ti ti-sun';

  // Active nav
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') && a.getAttribute('href').includes(path)) {
      a.classList.add('active');
    }
  });
  if (path === 'index.html' || path === '') {
    const home = document.querySelector('[data-page="home"]');
    if (home) home.classList.add('active');
  }

  updateProgress();
});
