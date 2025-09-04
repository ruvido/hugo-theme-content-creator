// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
}

// Mobile Menu Manager
class MobileMenuManager {
  constructor() {
    this.init();
  }

  init() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    
    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', () => this.toggleMenu());
    }
  }

  toggleMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    
    menuToggle.classList.toggle('active');
    
    if (mobileNav.style.display === 'none' || !mobileNav.style.display) {
      mobileNav.style.display = 'block';
    } else {
      mobileNav.style.display = 'none';
    }
  }
}

// Search Functionality
class SearchManager {
  constructor() {
    this.searchToggle = document.querySelector('.search-toggle');
    this.searchOverlay = document.querySelector('.search-overlay');
    this.searchInput = document.querySelector('.search-input');
    this.searchClose = document.querySelector('.search-close');
    this.searchResults = document.querySelector('.search-results');
    this.allContent = [];
    this.init();
  }

  init() {
    if (!this.searchToggle || !this.searchOverlay || !this.searchInput) return;
    
    this.loadSearchIndex();
    this.setupEventListeners();
  }

  async loadSearchIndex() {
    try {
      const response = await fetch('/index.json');
      this.allContent = await response.json();
    } catch (error) {
      console.warn('Search index not found');
    }
  }

  setupEventListeners() {
    // Open search overlay
    this.searchToggle.addEventListener('click', () => {
      this.searchOverlay.style.display = 'block';
      this.searchInput.focus();
      document.body.style.overflow = 'hidden';
    });

    // Close search overlay
    this.searchClose.addEventListener('click', () => this.closeSearch());
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchOverlay.style.display === 'block') {
        this.closeSearch();
      }
    });

    // Close on overlay click
    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.closeSearch();
      }
    });

    // Search functionality
    let debounceTimer;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });
  }

  closeSearch() {
    this.searchOverlay.style.display = 'none';
    document.body.style.overflow = '';
    this.searchInput.value = '';
    this.searchResults.innerHTML = '';
  }

  performSearch(query) {
    if (!query || query.length < 2) {
      this.searchResults.innerHTML = '';
      return;
    }

    const results = this.allContent.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 8);

    this.displayResults(results);
  }

  displayResults(results) {
    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="search-no-results">Nessun risultato trovato</div>';
    } else {
      this.searchResults.innerHTML = results.map(item => `
        <a href="${item.permalink}" class="search-result-item">
          <div class="search-result-badge ${this.getBadgeClass(item.type)}">${this.getTypeName(item.type)}</div>
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-excerpt">${item.summary}</div>
        </a>
      `).join('');
    }
  }

  getBadgeClass(type) {
    const typeMap = {
      'articles': 'badge-article',
      'newsletters': 'badge-newsletter', 
      'podcasts': 'badge-podcast',
      'videos': 'badge-video'
    };
    return typeMap[type] || 'badge-article';
  }

  getTypeName(type) {
    const typeMap = {
      'articles': 'Articolo',
      'newsletters': 'Newsletter', 
      'podcasts': 'Podcast',
      'videos': 'Video'
    };
    return typeMap[type] || 'Contenuto';
  }
}

// Smooth scroll for anchor links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Performance optimization - Lazy loading
class LazyLoader {
  constructor() {
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new MobileMenuManager();
  new SearchManager();
  new SmoothScroll();
  new LazyLoader();
});