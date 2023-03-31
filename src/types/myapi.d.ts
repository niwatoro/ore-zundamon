export interface IMyAPI {}

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
