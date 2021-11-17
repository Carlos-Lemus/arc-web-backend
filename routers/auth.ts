import { Router } from 'express';
import { login, verifyJwt } from '../controllers/auth';
import { check } from 'express-validator';
import { validateFields, validateJwt } from '../middlewares';

const router: Router = Router();

router.post('/login', [
    check('username')
        .not().isEmpty()
        .withMessage('El username es obligatorio')
        .isString()
        .withMessage('El username debe ser un string'),
    check('password')
        .not().isEmpty()
        .withMessage('El password es obligatorio')
        .isString()
        .withMessage('El password debe ser un string')
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
    validateFields
], login);

router.post('/verify', [
    validateJwt
], verifyJwt);

export default router;