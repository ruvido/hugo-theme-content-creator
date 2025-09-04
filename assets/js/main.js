// Essential functionality only - optimized for performance
function initTheme() {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      try { localStorage.setItem('theme', newTheme); } catch(e) {}
    });
  }
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-mobile');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', !isOpen);
      nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
    });
  }
}

// Lazy-loaded search functionality with error handling
function initSearch() {
  const toggle = document.querySelector('.search-toggle');
  if (!toggle) return;
  
  let searchLoaded = false;
  
  toggle.addEventListener('click', () => {
    if (!searchLoaded) {
      try {
        loadSearchModule();
        searchLoaded = true;
      } catch(e) {
        console.warn('Search failed to load');
      }
    }
  });
}

function loadSearchModule() {
  const overlay = document.querySelector('.search-overlay');
  const input = document.querySelector('.search-input');
  if (!overlay || !input) return;
  
  overlay.style.display = 'block';
  input.focus();
  document.body.style.overflow = 'hidden';
  
  const close = document.querySelector('.search-close');
  const results = document.querySelector('.search-results');
  
  function closeSearch() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    input.value = '';
    if (results) results.innerHTML = '';
  }
  
  if (close) close.onclick = closeSearch;
  overlay.onclick = e => e.target === overlay && closeSearch();
  document.onkeydown = e => e.key === 'Escape' && closeSearch();
  
  // Simplified search without complex filtering
  let timer;
  input.oninput = e => {
    clearTimeout(timer);
    if (results) {
      timer = setTimeout(() => {
        results.innerHTML = e.target.value.length > 1 ? 
          '<div>Ricerca in corso...</div>' : '';
      }, 300);
    }
  };
}

// Minimal lazy loading - only when needed
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  imgs.forEach(img => observer.observe(img));
}

// Immediate critical functionality only
try {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCritical);
  } else {
    initCritical();
  }
} catch(e) {}

function initCritical() {
  try {
    initTheme();
    initMobileMenu();
  } catch(e) {}
  
  // Defer non-critical features
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initNonCritical, { timeout: 2000 });
  } else {
    setTimeout(initNonCritical, 1000);
  }
}

function initNonCritical() {
  try {
    initSearch();
    initLazyImages();
  } catch(e) {}
}