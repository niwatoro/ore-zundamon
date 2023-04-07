import Tesseract from "tesseract.js";

export const recognizeScreenText: () => Promise<string> = async () => {
  const buffer = await window.myAPI.captureFocusedWindow();
  const filteredBuffer = await window.myAPI.preprocessImage(buffer);
  const result = await Tesseract.recognize(filteredBuffer, "jpn", {
    logger: (m) => console.log(m),
    langPath: "https://tessdata.projectnaptha.com/4.0.0_best/jpn.traineddata.gz",
  });
  const text = result.data.words
    .filter((word) => word.confidence > 90)
    .map((word) => word.text)
    .join("");
  return text;
};
