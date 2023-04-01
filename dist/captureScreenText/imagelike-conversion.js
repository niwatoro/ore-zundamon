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
exports.convertImageBitmapToImageLike = void 0;
function convertImageBitmapToImageLike(imageBitmap) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const context = canvas.getContext("2d");
        if (context) {
            context.drawImage(imageBitmap, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            return imageData;
        }
        else {
            throw new Error("Failed to get context");
        }
    });
}
exports.convertImageBitmapToImageLike = convertImageBitmapToImageLike;
//# sourceMappingURL=imagelike-conversion.js.map