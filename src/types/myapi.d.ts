export interface IMyAPI {
  getFocusedWindowName: () => Promise<string>;
  captureFocusedWindow: () => Promise<Buffer>;
  preprocessImage: (buffer: Buffer) => Promise<Buffer>;
  fetchOpenAiApi: (prompt: string) => Promise<string>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
