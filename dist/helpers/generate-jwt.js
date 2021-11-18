"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwt = (payload) => new Promise((resolve, reject) => {
    const secretKey = process.env.SECRET_KEY;
    jsonwebtoken_1.default.sign({
        data: payload,
    }, secretKey, {
        expiresIn: '10h',
    }, (error, token) => {
        if (error) {
            console.log(error);
            reject('No se pudo crear al token');
        }
        else {
            resolve(token);
        }
    });
});
exports.generateJwt = generateJwt;
//# sourceMappingURL=generate-jwt.js.map