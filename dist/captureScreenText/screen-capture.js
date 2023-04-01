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
exports.captureScreen = void 0;
function captureScreen(sourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const stream = yield navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: true,
        });
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        const imageBitmap = yield imageCapture.grabFrame();
        videoTrack.stop();
        return imageBitmap;
    });
}
exports.captureScreen = captureScreen;
//# sourceMappingURL=screen-capture.js.map