"use strict";
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("myAPI", {
    getFocusedWindow: () => electron_1.ipcRenderer.invoke("get-focused-window"),
    sendIpcRenderer: () => {
        electron_1.ipcRenderer.send("screenshot:capture", {});
    },
    onLoad: () => {
        electron_1.ipcRenderer.on("screenshot:captured", (event, value) => {
            console.log(value);
        });
    },
});
//# sourceMappingURL=preload.js.map