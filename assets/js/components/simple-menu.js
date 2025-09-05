// ===== SIMPLE TOP-DOWN DROPDOWN MENU =====
// Lightweight, robust mobile menu with clean X button

const SimpleMenu = {
  init() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.dropdown = document.querySelector('.mobile-menu-dropdown');
    this.links = document.querySelectorAll('.mobile-menu-dropdown .nav-link');
    
    if (!this.toggle || !this.dropdown) {
      return; // Elements not found, exit silently
    }
    
    this.isOpen = false;
    this.bindEvents();
    this.setupAccessibility();
  },
  
  bindEvents() {
    // Toggle menu on button click
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.toggle.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Close menu when window is resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Close menu when clicking on a link
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(() => this.closeMenu(), 100);
      });
    });
  },
  
  setupAccessibility() {
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.setAttribute('aria-controls', 'mobile-menu');
    this.toggle.setAttribute('aria-label', 'Menu di navigazione');
    
    this.dropdown.setAttribute('id', 'mobile-menu');
    this.dropdown.setAttribute('role', 'menu');
    this.dropdown.setAttribute('aria-hidden', 'true');
  },
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },
  
  openMenu() {
    this.isOpen = true;
    
    // Update DOM
    this.toggle.classList.add('menu-open');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.toggle.setAttribute('aria-label', 'Chiudi menu');
    
    this.dropdown.classList.add('show');
    this.dropdown.setAttribute('aria-hidden', 'false');
    
    // Focus first link
    setTimeout(() => {
      const firstLink = this.dropdown.querySelector('.nav-link');
      if (firstLink) {
        firstLink.focus();
      }
    }, 150);
  },
  
  closeMenu() {
    this.isOpen = false;
    
    // Update DOM
    this.toggle.classList.remove('menu-open');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.setAttribute('aria-label', 'Menu di navigazione');
    
    this.dropdown.classList.remove('show');
    this.dropdown.setAttribute('aria-hidden', 'true');
    
    // Return focus to toggle
    this.toggle.focus();
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  SimpleMenu.init();
});

// Export for external use
window.SimpleMenu = SimpleMenu;