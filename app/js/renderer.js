const { ipcRenderer } = require("electron");
const timer = require("./timer");

let timeEl = document.querySelector(".tempo");
let courseEl = document.querySelector(".curso");
window.onload = function() {
  ipcRenderer.send("tempo-do-curso", courseEl.textContent);
  ipcRenderer.once("tempo-do-curso-resposta", (ev, studiedTime) => {
    timeEl.textContent = studiedTime;
  });
  ipcRenderer.on("course-changed", (ev, course, timeStudied) => {
    courseEl.textContent = course;
    timeEl.textContent = timeStudied;
  });
};

let linkAbout = document.querySelector("#link-sobre");
linkAbout.addEventListener("click", function() {
  ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let buttonPlay = document.querySelector(".botao-play");
let play = false;
buttonPlay.addEventListener("click", () => {
  if (play) {
    timer.stop(courseEl.textContent);
  } else {
    timer.play(timeEl);
  }
  play = !play;
  imgs.reverse();
  buttonPlay.src = imgs[0];
});

let addButton = document.querySelector('.botao-adicionar');
let addInput = document.querySelector('.campo-adicionar');
addButton.addEventListener('click', () => {
  courseEl.textContent = addInput.value;
  timeEl.textContent = '00:00:00';
  addInput.value = null;
  ipcRenderer.send('course-added', courseEl.textContent);
})