/**
 * Ghost Audio Player - Simple and clean like Ghost CMS
 */

class GhostAudio {
  constructor(element) {
    this.container = element;
    this.audio = element.querySelector('.kg-audio-player-container .kg-audio-player');
    this.playButton = element.querySelector('.kg-audio-play-icon');
    this.currentTime = element.querySelector('.kg-audio-current-time');
    this.duration = element.querySelector('.kg-audio-duration');
    this.progressBar = element.querySelector('.kg-audio-time-track');
    this.seekSlider = element.querySelector('.kg-audio-seek-slider');
    this.player = element.querySelector('.kg-audio-player:not(.kg-audio-player-container .kg-audio-player)');
    
    this.isPlaying = false;
    
    this.init();
  }
  
  init() {
    if (!this.audio) return;
    
    // Events
    this.playButton?.addEventListener('click', () => this.toggle());
    this.audio.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('ended', () => this.onEnded());
    this.seekSlider?.addEventListener('input', (e) => this.onSeek(e));
  }
  
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  play() {
    this.audio.play();
    this.isPlaying = true;
    this.player?.classList.add('playing');
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.player?.classList.remove('playing');
  }
  
  onLoadedMetadata() {
    const duration = this.audio.duration;
    if (this.seekSlider) {
      this.seekSlider.max = duration;
    }
    if (this.progressBar) {
      this.progressBar.max = duration;
    }
    if (this.duration && isFinite(duration)) {
      this.duration.textContent = this.formatTime(duration);
    }
  }
  
  onTimeUpdate() {
    const currentTime = this.audio.currentTime;
    if (this.currentTime) {
      this.currentTime.textContent = this.formatTime(currentTime);
    }
    if (this.seekSlider) {
      this.seekSlider.value = currentTime;
    }
    if (this.progressBar) {
      this.progressBar.value = currentTime;
    }
  }
  
  onEnded() {
    this.isPlaying = false;
    this.player?.classList.remove('playing');
    if (this.currentTime) {
      this.currentTime.textContent = '0:00';
    }
  }
  
  onSeek(e) {
    const time = parseFloat(e.target.value);
    this.audio.currentTime = time;
  }
  
  formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// Auto initialize
function initGhostAudio() {
  document.querySelectorAll('.kg-audio-card').forEach(element => {
    if (!element.ghostAudio) {
      element.ghostAudio = new GhostAudio(element);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGhostAudio);
} else {
  initGhostAudio();
}

export default GhostAudio;