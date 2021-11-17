"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', [], users_1.getUsers);
router.get('/:id', [], users_1.getUser);
router.post('/', [
    (0, express_validator_1.check)('idRol')
        .not().isEmpty()
        .withMessage('El idRol es obligatorio'),
    (0, express_validator_1.check)('age')
        .not().isEmpty()
        .withMessage('La age es obligatorio')
        .isInt({ min: 18, max: 100 })
        .withMessage('La age debe ser un numero entero positivo'),
    (0, express_validator_1.check)('phone')
        .not().isEmpty()
        .withMessage('El phone es obligatorio')
        .isString()
        .withMessage('El phone debe ser un string'),
    (0, express_validator_1.check)('direction')
        .not().isEmpty()
        .withMessage('La direction es obligatorio')
        .isString()
        .withMessage('La direction debe ser un string'),
    (0, express_validator_1.check)('email')
        .not().isEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('La direction debe ser un valido'),
    (0, express_validator_1.check)('firstName')
        .not().isEmpty()
        .withMessage('El firstName es obligatorio')
        .isString()
        .withMessage('El firstName debe ser un string'),
    (0, express_validator_1.check)('lastName')
        .not().isEmpty()
        .withMessage('El lastName es obligatorio')
        .isString()
        .withMessage('El lastName debe ser un string'),
    (0, express_validator_1.check)('password')
        .not().isEmpty()
        .withMessage('El password es obligatorio')
        .isString()
        .withMessage('El password debe ser un string')
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
    (0, express_validator_1.check)('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    middlewares_1.validFields
], users_1.createUser);
router.put('/:id', [
    (0, express_validator_1.check)('idRol')
        .not().isEmpty()
        .withMessage('El idRol es obligatorio'),
    (0, express_validator_1.check)('age')
        .not().isEmpty()
        .withMessage('La age es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La age debe ser un numero entero positivo'),
    (0, express_validator_1.check)('phone')
        .not().isEmpty()
        .withMessage('El phone es obligatorio')
        .isString()
        .withMessage('El phone debe ser un string'),
    (0, express_validator_1.check)('direction')
        .not().isEmpty()
        .withMessage('La direction es obligatorio')
        .isString()
        .withMessage('La direction debe ser un string'),
    (0, express_validator_1.check)('email')
        .not().isEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('La direction debe ser un valido'),
    (0, express_validator_1.check)('firstName')
        .not().isEmpty()
        .withMessage('El firstName es obligatorio')
        .isString()
        .withMessage('El firstName debe ser un string'),
    (0, express_validator_1.check)('lastName')
        .not().isEmpty()
        .withMessage('El lastName es obligatorio')
        .isString()
        .withMessage('El lastName debe ser un string'),
    (0, express_validator_1.check)('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    middlewares_1.validFields
], users_1.updateUser);
router.delete('/:id', [], users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users%20copy.js.map