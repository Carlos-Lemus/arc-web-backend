"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    const token = req.headers['Authorization'];
    const secretKey = process.env.SECRET_KEY;
    if (token) {
        res.json(400).json({
            success: false,
            msg: 'El token no existe'
        });
    }
    try {
        jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        res.json(400).json({
            success: false,
            msg: 'Token no valido'
        });
    }
    next();
};
exports.default = verifyJwt;
//# sourceMappingURL=verify-jwt.js.map