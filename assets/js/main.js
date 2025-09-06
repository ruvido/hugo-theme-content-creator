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
  
  // Initialize Ghost audio players
  const ghostAudioCards = document.querySelectorAll('.kg-audio-card');
  if (ghostAudioCards.length > 0) {
    import('./components/ghost-audio.js');
  }
}

// Initialize when idle or fallback to DOMContentLoaded
if ('requestIdleCallback' in window) {
  requestIdleCallback(initComponents);
} else {
  document.addEventListener('DOMContentLoaded', initComponents);
}