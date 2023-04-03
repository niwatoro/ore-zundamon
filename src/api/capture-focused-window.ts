import { NativeImage, desktopCapturer, dialog, screen } from "electron";

export const captureFocusedWindow: () => Promise<Buffer> = async () => {
  const { width, height } = screen.getPrimaryDisplay().size;
  const image: NativeImage = await desktopCapturer.getSources({ types: ["window"], thumbnailSize: { width, height } }).then(async (sources) => {
    const source = sources[0];
    const image = source.thumbnail;
    if (image.isEmpty()) {
      dialog.showErrorBox("Error", "Could not capture window");
      throw new Error("Could not capture window");
    }
    return image;
  });
  return image.toPNG();
};
