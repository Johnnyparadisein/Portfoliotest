// Theme Switcher
const createThemeToggle = () => {
  const themeToggle = document.createElement('button');
  themeToggle.classList.add('theme-toggle');
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  themeToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm0-10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"/>
      <path d="M12 4V2M12 22v-2M4.93 4.93L6.34 6.34M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  `;
  document.body.appendChild(themeToggle);

  // Check local storage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Save theme preference to local storage
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
};

// Initialize loading animation
const initLoading = () => {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerHTML = '<div class="loader-content"></div>';
  document.body.appendChild(loader);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });
};

// Initialize relevant functions
document.addEventListener('DOMContentLoaded', () => {
  createThemeToggle();
  initLoading();
}); 