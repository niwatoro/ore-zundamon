export interface IMyAPI {
  getFocusedWindowName: () => Promise<string>;
  recognizeText: (image: Buffer) => Promise<string>;
  recognizeScreenText: () => Promise<string>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
