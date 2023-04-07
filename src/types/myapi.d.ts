import { OpenAiReponse } from "src/api/fetch-openai-api";

export interface IMyAPI {
  getFocusedWindowName: () => Promise<string>;
  captureFocusedWindow: () => Promise<Buffer>;
  preprocessImage: (buffer: Buffer) => Promise<Buffer>;
  fetchOpenAiApi: (prompt: string) => Promise<OpenAiReponse>;
}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
