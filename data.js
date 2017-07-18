const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
  saveStudiedTime(courseName, timeStudied) {
    let filepath = __dirname + "/data/" + courseName + ".json";
    this.createCourseFile(filepath, {
      lastUpdate: new Date().toString(),
      timeStudied: timeStudied
    });
  },
  getStudiedTime(courseName, callback) {
    let filepath = __dirname + "/data/" + courseName + ".json";
    this.readCourseFile(filepath)
      .then(json => {
        callback(null, json.timeStudied);
      })
      .catch(err => {
        callback(err);
      });
  },
  createCourseFile(file, content) {
    return jsonfile.writeFile(file, content, { spaces: 2 });
  },
  readCourseFile(file) {
    return jsonfile.readFile(file);
  },
  getCourses() {
    let files = fs.readdirSync(__dirname + "/data/");
    return files.map(f => {
      return f.substr(0, f.lastIndexOf("."));
    });
  }
};
