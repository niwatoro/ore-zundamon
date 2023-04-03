import { dialog } from "electron";
import tesseract from "node-tesseract-ocr";

export const recognizeText: (image: Buffer) => Promise<string> = async (image) => {
  const text = tesseract
    .recognize(image, { lang: "eng" })
    .then((text) => {
      return text;
    })
    .catch((error) => {
      dialog.showErrorBox("Error", error.message);
      throw error;
    });
  return text;
};
