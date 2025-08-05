// Theme Manager
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme || 'light');
  localStorage.setItem('theme', theme || 'light');
}

// Initialize theme
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  
  themeToggleBtns.forEach(btn => {
    const moonIcon = btn.querySelector('#moon-icon');
    const sunIcon = btn.querySelector('#sun-icon');
    
    if (savedTheme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  });
}

// Toggle theme
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  applyTheme(newTheme);
  themeToggleBtns.forEach(btn => {
    btn.querySelectorAll('svg').forEach(icon => {
      icon.style.display = icon.id.includes(newTheme) ? 'block' : 'none';
    });
  });
}


export function initTheme() {
  initializeTheme();
}

// Add event listeners to all theme toggles
themeToggleBtns.forEach(btn => {
  btn.addEventListener('click', toggleTheme);
});