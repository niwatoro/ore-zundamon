// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  getFocusedWindowName: () => ipcRenderer.invoke("get-focused-window-name"),
  recognizeText: (image: Buffer) => ipcRenderer.invoke("recognize-text", image),
  recognizeScreenText: () => ipcRenderer.invoke("recognize-screen-text"),
});
