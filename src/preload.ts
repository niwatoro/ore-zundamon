// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  getFocusedWindowName: () => ipcRenderer.invoke("get-focused-window-name"),
  captureFocusedWindow: () => ipcRenderer.invoke("capture-focused-window"),
  preprocessImage: (buffer: Buffer) => ipcRenderer.invoke("preprocess-image", buffer),
  fetchOpenAiApi: (prompt: string) => ipcRenderer.invoke("fetch-openai-api", prompt),
});
