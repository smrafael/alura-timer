const { ipcRenderer } = require('electron');
const timer = require('./timer');

let time = document.querySelector('.tempo');
let course = document.querySelector('.curso');
window.onload = function() {
    ipcRenderer.send('tempo-do-curso', course.textContent);
    ipcRenderer.once('tempo-do-curso-resposta', (ev, studiedTime) => {
        time.textContent = studiedTime;
    });
};

let linkAbout = document.querySelector('#link-sobre');
linkAbout.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let buttonPlay = document.querySelector('.botao-play');
let play = false;
buttonPlay.addEventListener('click', () => {
    if (play) {
        timer.stop(course.textContent);
    } else {
        timer.play(time);
    }
    play = !play;
    imgs.reverse();
    buttonPlay.src = imgs[0];
});