const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let play = false;
botaoPlay.addEventListener('click', () => {
    if (play) {
        timer.parar();
    } else {
        timer.iniciar(tempo);
    }
    play = !play;
    imgs.reverse();
    botaoPlay.src = imgs[0];
});