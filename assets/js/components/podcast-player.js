/**
 * Ghost-inspired Custom Podcast Player
 * Minimal, elegant audio player for podcast shortcodes
 */

class PodcastPlayer {
  constructor(element) {
    this.player = element;
    this.audio = this.player.querySelector('[data-podcast-audio]');
    this.playBtn = this.player.querySelector('[data-play-btn]');
    this.progressBar = this.player.querySelector('[data-progress-bar]');
    this.progressFill = this.player.querySelector('[data-progress-fill]');
    this.currentTimeEl = this.player.querySelector('[data-current-time]');
    this.playIcon = this.player.querySelector('.play-icon');
    this.pauseIcon = this.player.querySelector('.pause-icon');
    
    this.isPlaying = false;
    this.duration = 0;
    
    this.init();
  }
  
  init() {
    if (!this.audio) return;
    
    // Bind events
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.audio.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('ended', () => this.onEnded());
    
    // Progress bar click
    this.progressBar.addEventListener('click', (e) => this.onProgressClick(e));
    
    // Keyboard controls
    this.player.addEventListener('keydown', (e) => this.onKeyDown(e));
  }
  
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  play() {
    // Pause other playing podcasts
    document.querySelectorAll('[data-podcast-player]').forEach(player => {
      if (player !== this.player) {
        const otherAudio = player.querySelector('[data-podcast-audio]');
        if (otherAudio && !otherAudio.paused) {
          otherAudio.pause();
        }
      }
    });
    
    this.audio.play();
    this.isPlaying = true;
    this.playIcon.classList.add('hidden');
    this.pauseIcon.classList.remove('hidden');
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playIcon.classList.remove('hidden');
    this.pauseIcon.classList.add('hidden');
  }
  
  onLoadedMetadata() {
    this.duration = this.audio.duration;
  }
  
  onTimeUpdate() {
    if (this.duration > 0) {
      const progress = (this.audio.currentTime / this.duration) * 100;
      this.progressFill.style.width = `${progress}%`;
    }
    
    this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
  }
  
  onEnded() {
    this.isPlaying = false;
    this.playIcon.classList.remove('hidden');
    this.pauseIcon.classList.add('hidden');
    this.progressFill.style.width = '0%';
    this.currentTimeEl.textContent = '00:00';
  }
  
  onProgressClick(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = clickX / width;
    
    if (this.duration > 0) {
      this.audio.currentTime = clickRatio * this.duration;
    }
  }
  
  onKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.togglePlay();
    }
  }
  
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Initialize podcast players when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const players = document.querySelectorAll('[data-podcast-player]');
  players.forEach(player => new PodcastPlayer(player));
});

export default PodcastPlayer;