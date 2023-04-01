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
exports.recognizeText = void 0;
const tesseract_js_1 = require("tesseract.js");
function recognizeText(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = yield (0, tesseract_js_1.createWorker)();
        yield worker.load();
        yield worker.loadLanguage("jpn");
        yield worker.initialize("jpn");
        const { data: { text }, } = yield worker.recognize(image);
        yield worker.terminate();
        return text;
    });
}
exports.recognizeText = recognizeText;
//# sourceMappingURL=text-recognition.js.map