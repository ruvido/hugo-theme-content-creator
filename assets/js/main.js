// Essential functionality only - optimized for performance

// Cache DOM elements for better performance
let cachedElements = {};

function getCachedElement(selector) {
  if (!cachedElements[selector]) {
    cachedElements[selector] = document.querySelector(selector);
  }
  return cachedElements[selector];
}

function initTheme() {
  const toggleBtn = getCachedElement('.theme-toggle');
  const themeIcon = getCachedElement('.theme-icon');
  
  if (toggleBtn && themeIcon) {
    // Set initial icon based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(themeIcon, currentTheme);
    
    // Use passive event listener for better performance
    toggleBtn.addEventListener('click', handleThemeToggle, { passive: true });
  }
}

function handleThemeToggle() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';
  
  // Batch DOM updates
  requestAnimationFrame(() => {
    document.documentElement.setAttribute('data-theme', newTheme);
    const themeIcon = getCachedElement('.theme-icon');
    if (themeIcon) {
      updateThemeIcon(themeIcon, newTheme);
    }
  });
  
  // Store theme preference
  try { 
    localStorage.setItem('theme', newTheme); 
  } catch(e) {
    // Silently fail if localStorage is not available
  }
}

function updateThemeIcon(icon, theme) {
  if (icon) {
    // Use consistent icon handling - show sun in dark mode, moon in light mode
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function initMobileMenu() {
  const toggle = getCachedElement('.mobile-menu-toggle');
  const nav = getCachedElement('.nav-mobile');
  
  if (toggle && nav) {
    toggle.addEventListener('click', handleMobileMenuToggle, { passive: true });
  }
}

function handleMobileMenuToggle() {
  const toggle = getCachedElement('.mobile-menu-toggle');
  const nav = getCachedElement('.nav-mobile');
  
  if (!toggle || !nav) return;
  
  const isOpen = toggle.classList.contains('active');
  
  // Batch DOM updates
  requestAnimationFrame(() => {
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);
    nav.classList.toggle('display-none');
  });
}

// Optimized lazy loading with better performance
function initLazyImages() {
  // Early return if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) return;
  
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Create a new image to preload
        const newImg = new Image();
        newImg.onload = () => {
          requestAnimationFrame(() => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
          });
        };
        
        newImg.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { 
    rootMargin: '50px',
    threshold: 0.1
  });
  
  imgs.forEach(img => observer.observe(img));
}

// Optimized initialization with better error handling
(function() {
  'use strict';
  
  // Critical functionality that must run immediately
  function initCritical() {
    try {
      initTheme();
      initMobileMenu();
    } catch(e) {
      console.warn('Critical initialization failed:', e);
    }
    
    // Schedule non-critical features
    scheduleNonCritical();
  }
  
  // Non-critical functionality can be deferred
  function initNonCritical() {
    try {
      initLazyImages();
    } catch(e) {
      console.warn('Non-critical initialization failed:', e);
    }
  }
  
  function scheduleNonCritical() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initNonCritical, { timeout: 2000 });
    } else {
      setTimeout(initNonCritical, 500);
    }
  }
  
  // Optimized DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCritical, { once: true });
  } else {
    // DOM is already ready, initialize immediately
    initCritical();
  }
})();