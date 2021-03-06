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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = __importDefault(require("serialport"));
const models_1 = require("../models");
class SocketController {
    constructor(socketio) {
        this.socketio = socketio;
        this.Readline = serialport_1.default.parsers.Readline;
        this.portSerial = new serialport_1.default('COM2', { baudRate: 9600 });
        this.parser = this.portSerial.pipe(new this.Readline({ delimiter: '\r\n' }));
        this.start();
    }
    start() {
        this.portSerial.on('error', (error) => {
            console.log(error);
        });
        this.socketio.on('connect', this.controller);
    }
    controller(socket) {
        console.log(this.parser);
        return;
        this.parser.on('open', () => {
            console.log('open connection');
        });
        this.parser.on('data', (data) => __awaiter(this, void 0, void 0, function* () {
            const dateFull = new Date();
            const dataArray = data.split(';');
            const temperature = parseFloat(dataArray[0]);
            let record = null;
            try {
                record = new models_1.Record({
                    number: parseInt(dataArray[1]),
                    dateFull,
                    temperature,
                    result: temperature > 37 ? 'Alta' : 'Normal',
                });
                yield record.save();
            }
            catch (error) {
                console.log(error);
            }
            finally {
                socket.broadcast.emit('/socket/sendTemp', record);
            }
        }));
    }
}
exports.default = SocketController;
//# sourceMappingURL=socket-controller.js.map