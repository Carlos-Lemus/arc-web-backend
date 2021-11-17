"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJwt = (req, res, next) => {
    const token = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY;
    if (!token) {
        return res.status(400).json({
            success: false,
            msg: 'El token no existe'
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        const { data } = payload;
        req.userData = data;
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Token no valido'
        });
    }
    next();
};
exports.default = validateJwt;
//# sourceMappingURL=validate-jwt.js.map