const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkClose = document.querySelector("#link-fechar");
let linkGithub = document.querySelector("#link-github");
let electronVersion = document.querySelector('#versao-electron');

window.onload = function(){
    electronVersion.textContent = process.versions.electron;
}

linkClose.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
})

linkGithub.addEventListener('click', function () {
    shell.openExternal("https://github.com/smrafael");
})
