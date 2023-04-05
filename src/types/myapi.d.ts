export interface IMyAPI {
  getFocusedWindowName: () => Promise<string>;
  captureFocusedWindow: () => Promise<Buffer>;
  preprocessImage: (buffer: Buffer) => Promise<Buffer>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
