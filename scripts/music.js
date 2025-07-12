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
            
            // Icons
            this.playIcon = document.getElementById('playIcon');
            this.pauseIcon = document.getElementById('pauseIcon');
            this.volumeOnIcon = document.getElementById('volumeOnIcon');
            this.volumeOffIcon = document.getElementById('volumeOffIcon');
            
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
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
            this.volumeBtn.addEventListener('click', () => this.toggleMute());
            this.minimizeBtn.addEventListener('click', () => this.toggleMinimize());
            this.progressBar.addEventListener('click', (e) => this.seekTo(e));
            
            this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('play', () => this.onPlay());
            this.audio.addEventListener('pause', () => this.onPause());
            
            this.setupFirstInteraction();
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
            
            const icon = this.minimizeBtn.querySelector('svg path');
            if (this.isMinimized) {
                icon.setAttribute('d', 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 2L3 7V9H21M12 10.5C10.6 10.5 9.5 11.6 9.5 13C9.5 14.4 10.6 15.5 12 15.5C13.4 15.5 14.5 14.4 14.5 13C14.5 11.6 13.4 10.5 12 10.5ZM12 8.5C11.2 8.5 10.5 9.2 10.5 10C10.5 10.8 11.2 11.5 12 11.5C12.8 11.5 13.5 10.8 13.5 10C13.5 9.2 12.8 8.5 12 8.5Z');
                this.minimizeBtn.setAttribute('aria-label', 'Expand player');
            } else {
                icon.setAttribute('d', 'M19 13H5v-2h14v2z');
                this.minimizeBtn.setAttribute('aria-label', 'Minimize player');
            }
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
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new AudioPlayerController();
        });
    } else {
        new AudioPlayerController();
    }
