const data = require("./data.js");

module.exports = {
  getTemplate(mainWindow) {
    let template = [{ label: "Cursos" }, { type: "separator" }];

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
  }
};
