export interface IMyAPI {
  getScreenshot: () => Promise<string>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
