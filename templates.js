const { app, ipcMain } = require("electron");
const data = require("./data.js");
let template = null;

module.exports = {
  getTrayTemplate(mainWindow) {
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
  },
  getMenuTemplate() {
    let menuTemplate = [
      {
        label: "Help",
        submenu: [
          {
            label: "About",
            accelerator: "CmdOrCtrl+I",
            click: () => {
              ipcMain.emit("abrir-janela-sobre");
            }
          }
        ]
      }
    ];
    if (process.platform === "darwin") {
      menuTemplate.unshift({
        label: app.getName()
      });
    }
    return menuTemplate;
  }
};
