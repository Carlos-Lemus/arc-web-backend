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
exports.getRecordsDataByYear = exports.getRecords = void 0;
const models_1 = require("../models");
const getRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dateRequest = req.headers[`date-request`] || null;
    const dateStart = new Date(`${dateRequest}T00:00:00Z`);
    const dateEnd = new Date(`${dateRequest}T00:00:00Z`);
    dateEnd.setDate(dateEnd.getDate() + 1);
    try {
        let records = [];
        if (dateRequest) {
            records = yield models_1.Record.find({
                dateFull: {
                    $gte: dateStart,
                    $lt: dateEnd
                }
            });
        }
        else {
            records = yield models_1.Record.find();
        }
        const highs = records.filter(record => record.temperature > 37).length;
        const normals = records.filter(record => record.temperature <= 37).length;
        return res.status(200).json({
            success: true,
            records,
            highs,
            normals,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'Ha ocurrido un error en el servidor :('
        });
    }
});
exports.getRecords = getRecords;
const getRecordsDataByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.headers[`year`] || '0';
    const yearParser = parseInt(year);
    const monthsValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    try {
        for (let index = 0; index < monthsValues.length; index++) {
            const dateStart = new Date(yearParser, index, 0, 0, 0, 0);
            const dateEnd = new Date(yearParser, index + 1, 0, 0, 0, 0);
            const records = yield models_1.Record.find({
                dateFull: {
                    $gte: dateStart,
                    $lt: dateEnd
                },
                temperature: {
                    $gte: 38
                }
            });
            monthsValues[index] = records.length;
        }
        return res.status(200).json({
            success: true,
            monthsValues
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'Ha ocurrido un error en el servidor :('
        });
    }
});
exports.getRecordsDataByYear = getRecordsDataByYear;
//# sourceMappingURL=records.js.map