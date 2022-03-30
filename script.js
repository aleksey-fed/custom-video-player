const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const toggle = player.querySelector('.toggle');
const volumeBtn = player.querySelector('.volume');
const range = player.querySelector('.volume__range');
const play = player.querySelector('.play');

// Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (this.paused) {
    toggle.classList.remove('pause__btn');
    toggle.classList.add('play__btn');
  } else {
    toggle.classList.add('pause__btn');
    toggle.classList.remove('play__btn');
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  
  progress.value = `${percent}`;
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}


let currentVolume = 0;

function updateVolumeButton() {
  volumeBtn.classList.toggle('volume__off');
  
  if (video.volume == 0) {
    video.volume = currentVolume;
  } else {
    currentVolume = video.volume;
    video.volume = 0;
  }
}

function handleSoundUpdate() {
  video.volume = this.value / 100;
  currentVolume = video.volume;

  if (video.volume == 0) {
    volumeBtn.classList.add('volume__off');
  } else {
    volumeBtn.classList.remove('volume__off');
  }
}

function updateVolume() {
  const value = this.value;

  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}

// Events

toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

volumeBtn.addEventListener('click', updateVolumeButton);

range.addEventListener('input', updateVolume);
range.addEventListener('input', handleSoundUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
