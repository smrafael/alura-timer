const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require("./data.js");
const trayMenuTemplate = require("./tray-menu-template.js");

let tray = null;
let mainWindow = null;
app.on("ready", () => {
  console.log("Application is running...");
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400
  });

  let trayMenu = Menu.buildFromTemplate(
    trayMenuTemplate.getTemplate(mainWindow)
  );

  tray = new Tray(__dirname + "/app/img/icon-tray.png");
  tray.setContextMenu(trayMenu);

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-closed", () => {
  app.quit();
});

let aboutWindow = null;
ipcMain.on("abrir-janela-sobre", () => {
  if (aboutWindow == null) {
    aboutWindow = new BrowserWindow({
      width: 300,
      height: 220,
      alwaysOnTop: true,
      frame: false
    });
    aboutWindow.on("closed", () => {
      aboutWindow = null;
    });
  }
  aboutWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
  aboutWindow.close();
});

ipcMain.on('curso-parado', (event, course, studiedTime) => {
  data.saveStudiedTime(course, studiedTime);
});

ipcMain.on('tempo-do-curso', (ev, course, callback) => {
  data.getStudiedTime(course, (err, studiedTime) => {
    ev.sender.send("tempo-do-curso-resposta", studiedTime);
  });
});

ipcMain.on('course-added', (ev, course) => {
  data.saveStudiedTime(course, '00:00:00');
  let trayMenu = Menu.buildFromTemplate(
    trayMenuTemplate.addCourseToTemplate(course, mainWindow)
  );
  tray.setContextMenu(trayMenu);
});
