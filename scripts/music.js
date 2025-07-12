// Audio Player Controller
class AudioPlayerController {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playerContainer = document.getElementById('audioPlayerContainer');
        
        // Icons
        this.playIcon = document.getElementById('playIcon');
        this.pauseIcon = document.getElementById('pauseIcon');
        this.volumeOnIcon = document.getElementById('volumeOnIcon');
        this.volumeOffIcon = document.getElementById('volumeOffIcon');
        this.minimizeIcon = this.minimizeBtn.querySelector('.minimize-icon');
        this.expandIcon = this.minimizeBtn.querySelector('.expand-icon');
        
        // State management (in-memory)
        this.isPlaying = false;
        this.isMuted = false;
        this.isMinimized = false;
        this.volume = 0.7;
        this.hasStarted = false;
        
        this.init();
    }
    
    init() {
        this.audio.volume = this.volume;
        this.setupEventListeners();
        this.updateDuration();
        this.attemptAutoPlay();
    }
    
    setupEventListeners() {
        this.playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlayPause();
        });
        
        this.volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMute();
        });
        
        this.minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMinimize();
        });
        
        this.progressBar.addEventListener('click', (e) => {
            e.stopPropagation();
            this.seekTo(e);
        });
        
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        
        this.setupFirstInteraction();
        
        // Prevent any accidental interference with page scrolling
        this.playerContainer.addEventListener('wheel', (e) => e.stopPropagation());
        this.playerContainer.addEventListener('touchmove', (e) => e.stopPropagation());
    }
    
    attemptAutoPlay() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.hasStarted = true;
                this.updatePlayPauseButton();
            }).catch(() => {
                console.log('Auto-play blocked - waiting for user interaction');
            });
        }
    }
    
    setupFirstInteraction() {
        const firstInteraction = () => {
            if (!this.hasStarted) {
                this.audio.play().then(() => {
                    this.hasStarted = true;
                    this.updatePlayPauseButton();
                }).catch(console.error);
            }
            
            document.removeEventListener('click', firstInteraction);
            document.removeEventListener('touchstart', firstInteraction);
        };
        
        document.addEventListener('click', firstInteraction);
        document.addEventListener('touchstart', firstInteraction);
    }
    
    togglePlayPause() {
        if (this.audio.paused) {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.hasStarted = true;
                }).catch(console.error);
            }
        } else {
            this.audio.pause();
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        this.updateVolumeButton();
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.audioPlayer.classList.toggle('minimized', this.isMinimized);
        this.updateMinimizeButton();
    }
    
    seekTo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        const newTime = percentage * this.audio.duration;
        
        if (!isNaN(newTime)) {
            this.audio.currentTime = newTime;
        }
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = `${progress}%`;
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        if (this.audio.duration) {
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    onPlay() {
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }
    
    onPause() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }
    
    updatePlayPauseButton() {
        if (this.isPlaying) {
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
        } else {
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
        }
    }
    
    updateVolumeButton() {
        if (this.isMuted) {
            this.volumeOnIcon.style.display = 'none';
            this.volumeOffIcon.style.display = 'block';
        } else {
            this.volumeOnIcon.style.display = 'block';
            this.volumeOffIcon.style.display = 'none';
        }
    }
    
    updateMinimizeButton() {
        if (this.isMinimized) {
            this.minimizeIcon.style.display = 'none';
            this.expandIcon.style.display = 'block';
            this.minimizeBtn.setAttribute('aria-label', 'Expand player');
        } else {
            this.minimizeIcon.style.display = 'block';
            this.expandIcon.style.display = 'none';
            this.minimizeBtn.setAttribute('aria-label', 'Minimize player');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AudioPlayerController();
    });
} else {
    new AudioPlayerController();
}
