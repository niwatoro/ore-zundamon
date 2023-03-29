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
exports.ZundamonVoice = void 0;
const ZundamonVoice = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const response_query = yield fetch(`http://localhost:50021/audio_query?text=${text}&speaker=1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data_query = yield response_query.json();
    const response_audio = yield fetch("http://localhost:50021/synthesis?speaker=1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data_query),
    });
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(yield response_audio.arrayBuffer(), (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        source.onended = () => {
            return;
        };
    });
});
exports.ZundamonVoice = ZundamonVoice;
//# sourceMappingURL=ZundamonVoice.js.map