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
const dbAddRecord = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const dateFull = new Date().toLocaleString('sv').replace(' ', 'T') + '.000+00:00';
    const dataArray = data.split(';');
    const temperature = parseFloat(dataArray[0]);
    let record = null;
    try {
        record = new models_1.Record({
            number: parseInt(dataArray[1]),
            dateFull,
            temperature,
            result: temperature >= 38 ? 'Alta' : 'Normal',
        });
        yield record.save();
        return record;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = dbAddRecord;
//# sourceMappingURL=db-add-record.js.map