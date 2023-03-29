"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = __importStar(require("react"));
const normal_png_1 = __importDefault(require("../images/normal.png"));
const send_svg_1 = __importDefault(require("../images/send.svg"));
const ZundamonVoice_1 = require("./ZundamonVoice");
const Home = () => {
    const [inputText, setInputText] = (0, react_1.useState)("");
    const [zundamonText, setZundamonText] = (0, react_1.useState)("ぼくはずんだもんなのだ。");
    const handleInput = (e) => {
        setInputText(e.target.value);
    };
    const handleSend = () => __awaiter(void 0, void 0, void 0, function* () {
        const sentences = inputText.split(/、|。|！|？|！？|？！/);
        for (const sentence of sentences) {
            yield (0, ZundamonVoice_1.ZundamonVoice)(sentence);
            yield new Promise((resolve) => setTimeout(resolve, 500));
        }
        setInputText("");
    });
    return (react_1.default.createElement("div", { className: "w-screen h-screen overflow-hidden" },
        react_1.default.createElement("div", { className: "flex justify-end w-full h-full absolute -z-10" },
            react_1.default.createElement("img", { className: "object-contain", src: normal_png_1.default, alt: "zundamon" })),
        react_1.default.createElement("div", { className: "h-full flex flex-col justify-end w-full" },
            react_1.default.createElement("div", { className: "flex items-center h-12 bg-white rounded-md m-3 mb-2 p-2 border-2 border-gray-300" }, zundamonText),
            react_1.default.createElement("div", { className: "flex items-center h-12 bg-white rounded-md m-3 mt-0 p-2 border-2 border-gray-300 shadow-md" },
                react_1.default.createElement("input", { onChange: handleInput, value: inputText, className: "w-full h-8 outline-none" }),
                react_1.default.createElement("button", { onClick: handleSend },
                    react_1.default.createElement("img", { src: send_svg_1.default }))))));
};
exports.Home = Home;
exports.default = exports.Home;
//# sourceMappingURL=Home.js.map