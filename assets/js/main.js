// ===== MAIN JS - CLEAN VERSION =====
// Initialize theme toggle when DOM is ready

// Use requestIdleCallback for better performance
function initTheme() {
  if (window.ThemeToggle) {
    window.ThemeToggle.init();
  }
}

// Initialize when idle or fallback to DOMContentLoaded
if ('requestIdleCallback' in window) {
  requestIdleCallback(initTheme);
} else {
  document.addEventListener('DOMContentLoaded', initTheme);
}