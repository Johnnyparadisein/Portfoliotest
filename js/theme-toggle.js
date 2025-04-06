/**
 * Theme Toggle JavaScript
 * Handles switching between light and dark modes
 */

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggleBtn = document.createElement('button');
  themeToggleBtn.id = 'theme-toggle';
  themeToggleBtn.innerHTML = `
    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;
  document.body.appendChild(themeToggleBtn);

  // Add styles for the theme toggle button
  const style = document.createElement('style');
  style.textContent = `
    #theme-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--glass-effect);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999;
      box-shadow: var(--box-shadow-sm);
      transition: all 0.3s ease;
      backdrop-filter: var(--backdrop-blur);
      -webkit-backdrop-filter: var(--backdrop-blur);
    }
    
    #theme-toggle:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow-md);
    }
    
    #theme-toggle .sun-icon,
    #theme-toggle .moon-icon {
      position: absolute;
      transition: all 0.3s ease;
    }
    
    body.light-mode #theme-toggle .sun-icon,
    body:not(.light-mode) #theme-toggle .moon-icon {
      opacity: 0;
      transform: scale(0.5);
    }
    
    body.light-mode #theme-toggle .moon-icon,
    body:not(.light-mode) #theme-toggle .sun-icon {
      opacity: 1;
      transform: scale(1);
    }
    
    /* Light mode variables */
    body.light-mode {
      --bg-dark-primary: #f5f5f7;
      --bg-dark-secondary: #ffffff;
      --bg-dark-tertiary: #eaeaec;
      --text-light: #1a1a1a;
      --text-medium: #4a4a4a;
      --text-dark: #8a8a8a;
      --glass-effect: rgba(255, 255, 255, 0.7);
      --box-shadow-sm: 0 4px 15px rgba(0, 0, 0, 0.05);
      --box-shadow-md: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
    
    /* Transition for all elements when theme changes */
    * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // Check for saved theme preference or prefer-color-scheme
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
  } else if (prefersDarkScheme) {
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
  }

  // Theme toggle event listener
  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  });
}); 