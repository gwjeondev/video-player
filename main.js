const body = document.querySelector("body");
const videoPlayer = document.getElementById("videoPlayer");
const video = document.querySelector("video");
const videoControl = document.getElementById("videoControl");
const statusBtn = document.getElementById("status-btn");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeBar = document.getElementById("volumeBar");
const volumeBtn = document.getElementById("volume-btn");
const fullBtn = document.getElementById("full-btn");

let progressMouse = false;
let videoScreenMouseStop;

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let minutes = Math.floor(secondsNumber / 60);
  let totalSeconds = secondsNumber - minutes * 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${minutes}:${totalSeconds}`;
};

const handleStatusBtn = () => {
  if (video.paused) {
    video.play();
    statusBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    statusBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleKeyDown = e => {
  if (e.keyCode === 32) {
    handleStatusBtn();
  }
};

const handleProgress = () => {
  const currentBar = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${currentBar}%`;
};

const handleProgressBar = e => {
  const changeTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = changeTime;
};

const handleProgressMouse = e => {
  if (e.type === "mousedown") {
    progressMouse = true;
  } else {
    progressMouse = false;
  }
};

const handleProgressMove = e => {
  if (progressMouse) {
    handleProgressBar(e);
  } else {
    return 0;
  }
};

const handleTimer = () => {
  const timer = setTimeout(() => {
    videoControl.classList.remove("show");
  }, 3000);
  return timer;
};

const handleVideoControlMove = () => {
  clearTimeout(videoScreenMouseStop);
  if (!videoControl.classList.contains("add")) {
    videoControl.classList.add("show");
  }
  videoScreenMouseStop = handleTimer();
};

const handleVideoControlLeave = () => {
  videoControl.classList.remove("show");
};

const handleVolumeBtn = () => {
  if (video.muted) {
    video.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
};

const handleVolumeControl = () => {
  const volume = volumeBar.value;
  video.volume = volume;
  if (video.volume > 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (video.volume > 0.1 && video.volume < 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (video.volume === 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
};

const handleSmallScreen = () => {
  // Cross Browsing
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozExitFullscreen) {
    document.mozExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullBtn.addEventListener("click", handleFullScreen);
};

const handleFullScreen = () => {
  // Cross Browsing
  if (videoPlayer.RequestFullscreen) {
    videoPlayer.RequestFullscreen();
  } else if (videoPlayer.webkitRequestFullscreen) {
    videoPlayer.webkitRequestFullscreen();
  } else if (videoPlayer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  } else if (videoPlayer.msRequestFullscreen) {
    videoPlayer.msRequestFullscreen();
  }
  fullBtn.addEventListener("click", handleSmallScreen);
};

const getCurrentTime = () => {
  const current = video.currentTime;
  const currentPlay = formatDate(current);
  currentTime.innerText = currentPlay;
};

const getTotalTime = () => {
  const duration = video.duration;
  const totalPlay = formatDate(duration);
  totalTime.innerText = totalPlay;
  setInterval(getCurrentTime, 1000);
};

const init = () => {
  video.addEventListener("click", handleStatusBtn);
  video.addEventListener("loadedmetadata", getTotalTime);
  video.addEventListener("timeupdate", handleProgress);
  videoPlayer.addEventListener("mousemove", handleVideoControlMove);
  videoPlayer.addEventListener("mouseleave", handleVideoControlLeave);
  progress.addEventListener("click", handleProgressBar);
  progress.addEventListener("mousemove", handleProgressMove);
  progress.addEventListener("mousedown", handleProgressMouse);
  progress.addEventListener("mouseup", handleProgressMouse);
  body.addEventListener("keydown", handleKeyDown);
  statusBtn.addEventListener("click", handleStatusBtn);
  volumeBtn.addEventListener("click", handleVolumeBtn);
  volumeBar.addEventListener("input", handleVolumeControl);
  fullBtn.addEventListener("click", handleFullScreen);
};

if (videoPlayer) {
  init();
}
