"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_app_1 = __importDefault(require("./models/server-app"));
const server = new server_app_1.default();
server.listen();
//# sourceMappingURL=index.js.map