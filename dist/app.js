"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const Home_1 = __importDefault(require("./components/Home"));
require("./styles/globals.css");
const root = client_1.default.createRoot(document.getElementById("app"));
root.render(react_1.default.createElement(Home_1.default, null));
//# sourceMappingURL=app.js.map