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
exports.getSource = void 0;
const electron_1 = require("electron");
function getSource() {
    return __awaiter(this, void 0, void 0, function* () {
        const sources = yield electron_1.desktopCapturer.getSources({ types: ["window"], thumbnailSize: { width: 0, height: 0 } });
        const source = sources[0];
        return source.id;
    });
}
exports.getSource = getSource;
//# sourceMappingURL=source-acquisiton.js.map