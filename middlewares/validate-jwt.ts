import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const validateJwt = (req: Request, res: Response, next: Function) => {

    const token: any = req.headers.authorization;
    const secretKey: string = process.env.SECRET_KEY!;

    if(!token) {
        return res.status(400).json({
            success: false,
            msg: 'El token no existe'
        });
    }
    try {
        const payload = jwt.verify(token, secretKey);
        
        const { data } = (payload as any);

        (req as any).userData = data;
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Token no valido'
        });
        
    }

    next();
}

export default validateJwt;