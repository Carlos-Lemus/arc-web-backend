"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    (0, express_validator_1.check)('password')
        .not().isEmpty()
        .withMessage('El password es obligatorio')
        .isString()
        .withMessage('El password debe ser un string')
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
    middlewares_1.validateFields
], auth_1.login);
router.post('/verify', [
    middlewares_1.validateJwt
], auth_1.verifyJwt);
exports.default = router;
//# sourceMappingURL=auth.js.map