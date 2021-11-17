"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const serialport_1 = __importDefault(require("serialport"));
const controller_1 = __importDefault(require("../sockets/controller"));
class ServerApp {
    constructor() {
        this.port = process.env.PORT || '4000';
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.Readline = serialport_1.default.parsers.Readline;
        this.portSerial = new serialport_1.default('COM2', { baudRate: 9600 });
        this.parser = this.portSerial.pipe(new this.Readline({ delimiter: '\r\n' }));
        this.initSerialPort();
        this.socket();
        this.listen();
    }
    socket() {
        this.server.on('connect', (io) => (0, controller_1.default)(io, this.parser));
    }
    initSerialPort() {
        this.portSerial.on('error', (error) => {
            console.log(error);
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Running on port ${this.port}`);
        });
    }
}
exports.default = ServerApp;
//# sourceMappingURL=serve-app.js.map