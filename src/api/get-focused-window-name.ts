import { desktopCapturer } from "electron";

export const getFocusedWindowName: () => Promise<string> = async () => {
  const sources = await desktopCapturer.getSources({ types: ["window"], thumbnailSize: { width: 0, height: 0 } });
  return sources[0].name;
};
