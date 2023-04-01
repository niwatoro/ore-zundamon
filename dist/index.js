"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const electron_1 = require("electron");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    electron_1.app.quit();
}
const getFocusedWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    const sources = yield electron_1.desktopCapturer.getSources({ types: ["window"], thumbnailSize: { width: 0, height: 0 } });
    return sources[0].name;
});
const startServer = () => {
    const server = (0, child_process_1.spawn)("npm", ["run", "start:server"], {
        shell: true,
        detached: true,
    });
    server.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });
    server.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    server.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    });
};
let mainWindow = null;
const createWindow = () => {
    // const isMac = process.platform === "darwin";
    // const isWindows = process.platform === "win32";
    const { width: screenWidth, height: screenHeight } = electron_1.screen.getPrimaryDisplay().size;
    const windowWidth = 400;
    const windowHeight = 400;
    const x = screenWidth - windowWidth;
    const y = screenHeight - windowHeight;
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
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
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    startServer();
    electron_1.ipcMain.handle("get-focused-window", getFocusedWindow);
    createWindow();
}));
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
electron_1.ipcMain.on("screenshot:capture", (value) => {
    electron_1.desktopCapturer.getSources({ types: ["window"], thumbnailSize: { width: 1920, height: 1080 } }).then((sources) => __awaiter(void 0, void 0, void 0, function* () {
        let image = sources[0].thumbnail.toDataURL();
        console.log(electron_1.systemPreferences.getMediaAccessStatus("screen"));
        electron_1.systemPreferences.askForMediaAccess("camera");
        console.log(sources.forEach((source) => console.log(source.thumbnail.isEmpty())));
        mainWindow.webContents.send("screenshot:captured", image);
    }));
});
//# sourceMappingURL=index.js.map