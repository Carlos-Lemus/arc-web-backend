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
const models_1 = require("../models");
const controllerSocket = (socket, parser) => {
    parser.on('open', () => {
        console.log('open connection');
    });
    parser.on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
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
};
exports.default = controllerSocket;
//# sourceMappingURL=controller.js.map