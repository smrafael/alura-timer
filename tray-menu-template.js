const data = require("./data.js");
let template = null;

module.exports = {
  getTemplate(mainWindow) {
    template = [{ label: "Cursos" }, { type: "separator" }];

    let courses = data.getCourses();
    courses.forEach(c => {
      let menuItem = {
        label: c,
        type: "radio",
        click: () => {
          data.getStudiedTime(c, (err, studiedTime) => {
            mainWindow.send("course-changed", c, studiedTime);
          });
        }
      };
      template.push(menuItem);
    });

    return template;
  },
  addCourseToTemplate(course, mainWindow) {
    let menuItem = {
      label: course,
      type: "radio",
      checked: true,
      click: () => {
        data.getStudiedTime(course, (err, studiedTime) => {
          mainWindow.send("course-changed", course, studiedTime);
        });
      }
    };
    template.push(menuItem);
    return template;
  }
};
