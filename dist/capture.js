"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureWindow = void 0;
const electron_1 = require("electron");
const tesseract_js_1 = require("tesseract.js");
const captureWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    const sources = yield electron_1.desktopCapturer.getSources({ types: ["window"] });
    const source = sources[0];
    const video = document.createElement("video");
    video.srcObject = yield navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            deviceId: source.id,
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 776, ideal: 720, max: 1080 },
        },
    });
    video.play();
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const worker = yield (0, tesseract_js_1.createWorker)();
    const result = yield worker.recognize(canvas.toDataURL());
    return result.data.text;
});
exports.captureWindow = captureWindow;
//# sourceMappingURL=capture.js.map