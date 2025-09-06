// ===== MAIN JS - CLEAN VERSION =====
// Initialize components when DOM is ready

// Use requestIdleCallback for better performance
function initComponents() {
  if (window.ThemeToggle) {
    window.ThemeToggle.init();
  }
  
  // Initialize podcast players (legacy)
  const players = document.querySelectorAll('[data-podcast-player]');
  if (players.length > 0) {
    import('./components/podcast-player.js').then(module => {
      players.forEach(player => new module.default(player));
    });
  }
  
  // Ghost audio cards use native HTML5 controls - no JS needed
}

// Initialize when idle or fallback to DOMContentLoaded
if ('requestIdleCallback' in window) {
  requestIdleCallback(initComponents);
} else {
  document.addEventListener('DOMContentLoaded', initComponents);
}