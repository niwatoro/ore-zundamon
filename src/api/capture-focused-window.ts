import { NativeImage, desktopCapturer, dialog, screen } from "electron";

export const captureFocusedWindow: () => NativeImage = () => {
  const { width, height } = screen.getPrimaryDisplay().size;
  desktopCapturer.getSources({ types: ["window"], thumbnailSize: { width, height } }).then(async (sources) => {
    const source = sources[0];
    const image = source.thumbnail;
    if (image.isEmpty()) {
      dialog.showErrorBox("Error", "Could not capture window");
      return null;
    }
    return image;

    // const win = new BrowserWindow({
    //   width: image.getSize().width,
    //   height: image.getSize().height,
    //   show: false,
    //   frame: false,
    //   transparent: true,
    // });
    // win.loadURL(source.thumbnail.toDataURL());
    // win.show();
  });
  return null;
};
