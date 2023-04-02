import { NativeImage } from "electron";

export interface IMyAPI {
  getFocusedWindowName: () => Promise<string>;
  captureFocusedWindow: () => NativeImage;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
