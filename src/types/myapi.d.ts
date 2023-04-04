export interface IMyAPI {
  getFocusedWindowName: () => Promise<string>;
  captureFocusedWindow: () => Promise<Buffer>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
    Tesseract: {
      recognize: (image: Blob) => Promise<string>;
    };
  }
}
