import { spawn } from "child_process";
import { app, BrowserWindow, screen } from "electron";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const startServer = () => {
  spawn("npm", ["run", "start:server"], {
    cwd: __dirname,
    detached: true,
    stdio: "ignore",
  }).unref();
};

const createWindow = (): void => {
  // const isMac = process.platform === "darwin";
  // const isWindows = process.platform === "win32";

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 400;
  const windowHeight = 400;
  const x = width - windowWidth;
  const y = height - windowHeight;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 400,
    width: 400,
    // transparent: true,
    // frame: !isWindows,
    // titleBarStyle: isMac ? "hiddenInset" : undefined,
    backgroundColor: "rgba(0,0,0,00)",
    minWidth: 300,
    minHeight: 300,
    maxWidth: 400,
    maxHeight: 400,
    maximizable: false,
    fullscreenable: false,
    x: x,
    y: y,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  startServer();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
