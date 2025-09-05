// ===== THEME TOGGLE MODULE =====
// Dark/Light theme switching functionality

const ThemeToggle = {
  init() {
    this.toggle = document.querySelector('.theme-toggle');
    
    if (!this.toggle) {
      return;
    }
    
    this.bindEvents();
  },
  
  bindEvents() {
    this.toggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  },
  
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.setTheme(newTheme);
  },
  
  getCurrentTheme() {
    return localStorage.getItem('theme-preference') || 'light';
  },
  
  setTheme(theme) {
    localStorage.setItem('theme-preference', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', 
        theme === 'dark' ? '#0f172a' : '#2563eb'
      );
    }
  }
};

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeToggle;
} else {
  window.ThemeToggle = ThemeToggle;
}