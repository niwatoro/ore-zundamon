"use strict";
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("myAPI", {
    getFocusedWindow: () => electron_1.ipcRenderer.invoke("get-focused-window"),
});
//# sourceMappingURL=preload.js.map