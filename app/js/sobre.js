const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkClose = document.querySelector("#link-fechar");
let linkTwitter = document.querySelector("#link-twitter");
let electronVersion = document.querySelector('#versao-electron');

window.onload = function(){
    electronVersion.textContent = process.versions.electron;
}

linkClose.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
})

linkTwitter.addEventListener('click', function () {
    shell.openExternal("https://github.com/smrafael");
})
