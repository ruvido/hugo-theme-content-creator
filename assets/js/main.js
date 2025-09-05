// ===== MAIN JS - CLEAN VERSION =====
// Initialize theme toggle when DOM is ready

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM loaded, initializing...');
  
  // Initialize Theme Toggle (defined in theme.js)
  if (window.ThemeToggle) {
    window.ThemeToggle.init();
    console.log('✅ Theme toggle initialized');
  } else {
    console.warn('ThemeToggle module not found');
  }
});