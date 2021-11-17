import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from 'bcrypt';
import { generateJwt } from '../helpers/generate-jwt';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response): Promise<Response> => {

    const { username: usernameLogin, password: passwordLogin } = req.body;

    try {

        const user = await User.findOne({
            username: usernameLogin
        }).populate('role', 'name');

        if (!user) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }

        const verifyPassword = bcrypt.compareSync(passwordLogin, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                msg: 'El usuario o contraseña equivocada'
            });
        }

        const { _id: id, firstName, lastName, username, email, role } = (user as any)._doc;

        const token = await generateJwt({ id, firstName, lastName, username, email, role });

        return res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'No se pudo iniciar sesion'
        });
    }

}

const verifyJwt = async (req: Request, res: Response): Promise<Response> => {

    const { userData } = (req as any);

    try {

        const token = await generateJwt(userData);

        return res.json({
            success: true,
            token
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
        });

    }
}

export {
    login,
    verifyJwt
}