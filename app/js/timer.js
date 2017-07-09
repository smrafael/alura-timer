const moment = require('moment');
const { ipcRenderer } = require('electron');
let seconds;
let timer;

module.exports = {
    play(el) {
        let time = moment.duration(el.textContent);
        seconds = time.asSeconds();
        clearInterval(timer);
        timer = setInterval(() => {
            seconds++
            el.textContent = this.secondsToTime(seconds);
        }, 1000);
    },
    stop(course) {
        let studiedTime = this.secondsToTime(seconds);
        ipcRenderer.send('curso-parado', course, studiedTime)
        clearInterval(timer);
    },
    secondsToTime() {
        return moment().startOf('day').seconds(seconds).format("HH:mm:ss");
    }
}