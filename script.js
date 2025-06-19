const video = document.getElementById("video");
const progress = document.getElementById("progress");
const videoList = [
  "videos/caminare_short.mp4",
  "videos/en_tus_manos_short.mp4",
  "videos/dios_espera_short.mp4",
  "videos/el_cielo_canta_short.mp4",
  "videos/el_senior_es_mi_fuerza_short.mp4",
  "videos/renace_la_esperanza_short.mp4",
];
let currentVideoIndex = 0;

video.addEventListener("timeupdate", () => {
  progress.max = video.duration;
  progress.value = video.currentTime;s
});

progress.addEventListener("input", () => {
  video.currentTime = progress.value;
});

function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function toggleMute() {
  video.muted = !video.muted;
}

function changeVolume(amount) {
  video.volume = Math.min(1, Math.max(0, video.volume + amount));
}

function changeSpeed(amount) {
  video.playbackRate = Math.min(3, Math.max(0.1, video.playbackRate + amount));
}

function resizeVideo(factor) {
  video.width *= factor;
  video.height *= factor;
}

function takeSnapshot() {
  const canvas = document.getElementById("snapshotCanvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");

  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "snapshot.png";
  a.click();
}

function prevVideo() {
  currentVideoIndex =
    (currentVideoIndex - 1 + videoList.length) % videoList.length;
  changeVideo(videoList[currentVideoIndex]);
}

function nextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
  changeVideo(videoList[currentVideoIndex]);
}

function selectVideo(element, path) {
  currentVideoIndex = videoList.indexOf(path);
  changeVideo(path);

  // Quitar clase 'active' de todos los items
  document
    .querySelectorAll("#videoList li")
    .forEach((li) => li.classList.remove("active"));

  // Agregar clase 'active' al item seleccionado
  if (element) {
    element.classList.add("active");
  }
}

function changeVideo(path) {
  video.src = path;
  video.load();
  video.play();
}
