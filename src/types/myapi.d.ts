export interface IMyAPI {
  getFocusedWindow: () => Promise<string>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
