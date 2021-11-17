import { Router } from "express";
import { check } from "express-validator";

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/users';
import { validateFields } from "../middlewares";

const router = Router();

router.get('/', [], getUsers)

router.get('/:id', [
], getUser)

router.post('/', [
    check('role')
        .not().isEmpty()
        .withMessage('El role es obligatorio'),
    check('age')
        .not().isEmpty()
        .withMessage('La age es obligatorio')
        .isInt({ min: 18, max: 100 })
        .withMessage('La age debe ser un numero entero positivo'),
    check('phone')
        .not().isEmpty()
        .withMessage('El phone es obligatorio')
        .isString()
        .withMessage('El phone debe ser un string'),
    check('direction')
        .not().isEmpty()
        .withMessage('La direction es obligatorio')
        .isString()
        .withMessage('La direction debe ser un string'),
    check('email')
        .not().isEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('La direction debe ser un valido'),
    check('firstName')
        .not().isEmpty()
        .withMessage('El firstName es obligatorio')
        .isString()
        .withMessage('El firstName debe ser un string'),
    check('lastName')
        .not().isEmpty()
        .withMessage('El lastName es obligatorio')
        .isString()
        .withMessage('El lastName debe ser un string'),
    check('password')
        .not().isEmpty()
        .withMessage('El password es obligatorio')
        .isString()
        .withMessage('El password debe ser un string')
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
    check('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    validateFields
], createUser)

router.put('/:id', [
    check('role')
        .not().isEmpty()
        .withMessage('El role es obligatorio'),
    check('age')
        .not().isEmpty()
        .withMessage('La age es obligatorio')
        .isInt({ min: 1 })
        .withMessage('La age debe ser un numero entero positivo'),
    check('phone')
        .not().isEmpty()
        .withMessage('El phone es obligatorio')
        .isString()
        .withMessage('El phone debe ser un string'),
    check('direction')
        .not().isEmpty()
        .withMessage('La direction es obligatorio')
        .isString()
        .withMessage('La direction debe ser un string'),
    check('email')
        .not().isEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('La direction debe ser un valido'),
    check('firstName')
        .not().isEmpty()
        .withMessage('El firstName es obligatorio')
        .isString()
        .withMessage('El firstName debe ser un string'),
    check('lastName')
        .not().isEmpty()
        .withMessage('El lastName es obligatorio')
        .isString()
        .withMessage('El lastName debe ser un string'),
    check('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    validateFields
], updateUser)

router.delete('/:id', [
], deleteUser)

export default router;