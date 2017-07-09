const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    saveStudiedTime(courseName, timeStudied) {
        let filepath = __dirname + '/data/' + courseName + '.json';
        this.createFile(filepath, {lastUpdate: new Date().toString(), timeStudied: timeStudied});
    },
    getStudiedTime(courseName, callback) {
        let filepath = __dirname + '/data/' + courseName + '.json';
        this.readFile(filepath)
            .then(json => {
                callback(null, json.timeStudied);
            })
            .catch(err => {
                callback(err);
            })
    },
    createFile(file, content) {
        return jsonfile.writeFile(file, content, {spaces: 2});
    },
    readFile(file) {
        return jsonfile.readFile(file);
    }
}