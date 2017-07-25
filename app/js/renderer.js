const { ipcRenderer } = require("electron");
const timer = require("./timer");

let timeEl = document.querySelector(".tempo");
let courseEl = document.querySelector(".curso");
let buttonPlay = document.querySelector(".botao-play");
window.onload = function() {
  ipcRenderer.send("tempo-do-curso", courseEl.textContent);
  ipcRenderer.once("tempo-do-curso-resposta", (ev, studiedTime) => {
    timeEl.textContent = studiedTime;
  });
  ipcRenderer.on("course-changed", (ev, course, timeStudied) => {
    if (play) {
      stop();
      tooglePlayStop();
    }
    courseEl.textContent = course;
    timeEl.textContent = timeStudied;
  });
  ipcRenderer.on("play-stop-time", ev => {
    let click = new MouseEvent("click");
    buttonPlay.dispatchEvent(click);
  });
};

let linkAbout = document.querySelector("#link-sobre");
linkAbout.addEventListener("click", function() {
  ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;
buttonPlay.addEventListener("click", () => {
  if (play) {
    stop();
  } else {
    timer.play(timeEl);
    new Notification("Alura Timer", {
      body: `The course ${courseEl.textContent} was started!`
    });
  }
  tooglePlayStop();
});

let addButton = document.querySelector(".botao-adicionar");
let addInput = document.querySelector(".campo-adicionar");
addButton.addEventListener("click", () => {
  courseEl.textContent = addInput.value;
  timeEl.textContent = "00:00:00";
  addInput.value = null;
  ipcRenderer.send("course-added", courseEl.textContent);
});

function stop () {
  timer.stop(courseEl.textContent);
    new Notification("Alura Timer", {
      body: `The course ${courseEl.textContent} was stopped!
Time: ${timeEl.textContent}`
    });
}

function tooglePlayStop()  {
  play = !play;
  imgs.reverse();
  buttonPlay.src = imgs[0];
}