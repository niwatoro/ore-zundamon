import { BrowserWindow } from "electron";
import sharp from "sharp";

export const preprocessImage: (buffer: Buffer) => Promise<Buffer> = async (buffer) => {
  const image = sharp(buffer);
  image.resize(2000, null);
  image.threshold();
  const filteredBuffer = await image.toBuffer();
  const win = new BrowserWindow({
    width: 2000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL("data:image/png;base64," + filteredBuffer.toString("base64"));
  return filteredBuffer;
};
