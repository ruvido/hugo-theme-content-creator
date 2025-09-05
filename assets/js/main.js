/**
 * Modern JavaScript for Hugo Content Creator Theme
 * State-of-the-art performance-optimized implementation
 */

class ThemeManager {
  constructor() {
    this.cache = new Map();
    this.init();
  }

  // Cache DOM elements for performance
  getElement(selector) {
    if (!this.cache.has(selector)) {
      this.cache.set(selector, document.querySelector(selector));
    }
    return this.cache.get(selector);
  }

  init() {
    // Use passive event listeners for better performance
    document.addEventListener('DOMContentLoaded', () => this.initializeComponents(), { 
      once: true, 
      passive: true 
    });

    // Initialize immediately if DOM is already ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      this.initMobileMenu();
      this.initLazyLoading();
      this.initThemeToggle();
    } catch (error) {
      console.warn('Component initialization failed:', error);
    }
  }

  // Modern mobile menu with proper state management
  initMobileMenu() {
    const toggle = this.getElement('.mobile-menu-toggle');
    const menu = this.getElement('.nav-mobile');
    
    if (!toggle || !menu) return;

    // State management
    let isOpen = false;
    
    // Get all nav links for keyboard navigation
    const navLinks = menu.querySelectorAll('.nav-link');

    // Set initial state
    this.setMobileMenuState(toggle, menu, navLinks, false);

    // Event handler with proper cleanup
    const handleToggle = (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      isOpen = !isOpen;
      this.setMobileMenuState(toggle, menu, navLinks, isOpen);
      
      // Update aria-label for screen readers
      const label = isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione';
      toggle.setAttribute('aria-label', label);
    };

    // Close menu on escape key
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        isOpen = false;
        this.setMobileMenuState(toggle, menu, navLinks, false);
        toggle.focus(); // Return focus to toggle button
      }
      
      // Handle keyboard navigation within menu
      if (isOpen && (event.key === 'Tab' || event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        this.handleMenuKeyboardNavigation(event, navLinks, toggle);
      }
    };

    // Close menu when clicking outside
    const handleOutsideClick = (event) => {
      if (isOpen && !toggle.contains(event.target) && !menu.contains(event.target)) {
        isOpen = false;
        this.setMobileMenuState(toggle, menu, navLinks, false);
      }
    };

    // Close menu when clicking on nav links
    const handleNavLinkClick = () => {
      isOpen = false;
      this.setMobileMenuState(toggle, menu, navLinks, false);
    };

    // Attach event listeners
    toggle.addEventListener('click', handleToggle, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleOutsideClick);
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Close menu on resize if screen becomes larger
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        isOpen = false;
        this.setMobileMenuState(toggle, menu, navLinks, false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      toggle.removeEventListener('click', handleToggle);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    }, { once: true });
  }

  // Helper method to manage mobile menu state
  setMobileMenuState(toggle, menu, navLinks, isOpen) {
    requestAnimationFrame(() => {
      // Update toggle button
      toggle.setAttribute('aria-expanded', isOpen.toString());
      toggle.classList.toggle('active', isOpen);
      
      // Update menu
      menu.setAttribute('aria-hidden', (!isOpen).toString());
      
      if (isOpen) {
        menu.classList.add('mobile-menu-open');
        // Enable keyboard navigation for menu items
        navLinks.forEach(link => {
          link.removeAttribute('tabindex');
        });
        // Focus first menu item for keyboard users
        if (navLinks.length > 0) {
          navLinks[0].focus();
        }
      } else {
        menu.classList.remove('mobile-menu-open');
        // Disable keyboard navigation for menu items
        navLinks.forEach(link => {
          link.setAttribute('tabindex', '-1');
        });
      }
    });
  }

  // Handle keyboard navigation within mobile menu
  handleMenuKeyboardNavigation(event, navLinks, toggle) {
    const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
    let nextIndex;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= navLinks.length) nextIndex = 0;
        navLinks[nextIndex].focus();
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = navLinks.length - 1;
        navLinks[nextIndex].focus();
        break;
        
      case 'Tab':
        // Allow normal tab behavior but ensure it stays within menu
        if (event.shiftKey && currentIndex === 0) {
          event.preventDefault();
          toggle.focus();
        } else if (!event.shiftKey && currentIndex === navLinks.length - 1) {
          event.preventDefault();
          toggle.focus();
        }
        break;
    }
  }

  // Optimized lazy loading with Intersection Observer
  initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Optimized image loading
  loadImage(img) {
    const tempImg = new Image();
    
    tempImg.onload = () => {
      requestAnimationFrame(() => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
      });
    };

    tempImg.onerror = () => {
      img.classList.add('error');
    };

    tempImg.src = img.dataset.src;
  }

  // Modern theme toggle with localStorage persistence
  initThemeToggle() {
    const toggle = this.getElement('.theme-toggle');
    if (!toggle) return;

    // Get current theme from localStorage or default to light
    let currentTheme = this.getStoredTheme();
    
    // Apply initial theme
    this.applyTheme(currentTheme);
    
    // Theme toggle event handler
    const handleThemeToggle = (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      // Toggle theme
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Apply new theme
      this.applyTheme(currentTheme);
      
      // Store in localStorage
      this.storeTheme(currentTheme);
      
      // Update aria-label for accessibility
      const label = currentTheme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro';
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    };

    // Attach event listener
    toggle.addEventListener('click', handleThemeToggle);

    // Handle system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e) => {
        // Only change if user hasn't set a preference
        if (!localStorage.getItem('theme-preference')) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(systemTheme);
          currentTheme = systemTheme;
        }
      };
      
      mediaQuery.addListener(handleSystemThemeChange);
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      toggle.removeEventListener('click', handleThemeToggle);
    }, { once: true });
  }

  // Get stored theme preference
  getStoredTheme() {
    try {
      const stored = localStorage.getItem('theme-preference');
      if (stored && (stored === 'light' || stored === 'dark')) {
        return stored;
      }
    } catch (e) {
      console.warn('Could not access localStorage:', e);
    }

    // Default to system preference or light
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Store theme preference
  storeTheme(theme) {
    try {
      localStorage.setItem('theme-preference', theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }

  // Apply theme to document
  applyTheme(theme) {
    const html = document.documentElement;
    
    // Use requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
    });

    // Update meta theme-color for browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#2563eb');
    }
  }
}

// Initialize theme manager when script loads
new ThemeManager();