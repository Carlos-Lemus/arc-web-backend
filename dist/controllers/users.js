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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const saltRounds = 10;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find().populate('role', 'name');
        return res.json({
            success: true,
            users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.User.findById(id).populate('role', 'name');
        return res.json({
            success: true,
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        payload.password = bcrypt_1.default.hashSync(payload.password, saltRounds);
        const user = new models_1.User(payload);
        yield user.save();
        return res.json({
            success: true,
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        let user = yield models_1.User.findById(id);
        if (payload.password) {
            payload.password = bcrypt_1.default.hashSync(payload.password, saltRounds);
        }
        yield (user === null || user === void 0 ? void 0 : user.updateOne(payload));
        return res.json({
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.User.findById(id);
        yield (user === null || user === void 0 ? void 0 : user.delete());
        return res.json({
            success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map