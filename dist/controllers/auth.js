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
exports.verifyJwt = exports.login = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username: usernameLogin, password: passwordLogin } = req.body;
    try {
        const user = yield models_1.User.findOne({
            username: usernameLogin
        }).populate('role', 'name');
        if (!user) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        const verifyPassword = bcrypt_1.default.compareSync(passwordLogin, user.password);
        if (!verifyPassword) {
            return res.status(400).json({
                msg: 'El usuario o contraseña equivocada'
            });
        }
        const { _id: id, firstName, lastName, username, email, role } = user._doc;
        const token = yield (0, generate_jwt_1.generateJwt)({ id, firstName, lastName, username, email, role });
        return res.json({
            success: true,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'No se pudo iniciar sesion'
        });
    }
});
exports.login = login;
const verifyJwt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userData } = req;
    try {
        const token = yield (0, generate_jwt_1.generateJwt)(userData);
        return res.json({
            success: true,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
        });
    }
});
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=auth.js.map