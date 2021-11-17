import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models";

const saltRounds: number = 10;

const getUsers = async (req: Request, res: Response): Promise<Response> => {

    try {

        const users = await User.find().populate('role', 'name');

        return res.json({
            success: true,
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }

}

const getUser = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {
        const user = await User.findById(id).populate('role', 'name');

        return res.json({
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }

}
const createUser = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        payload.password = bcrypt.hashSync(payload.password, saltRounds);
        
        const user = new User(payload);

        await user.save();
        
        return res.json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
    
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;
    const payload = req.body;
    
    try {
        
        let user = await User.findById(id);
        
        if(payload.password) {
            payload.password = bcrypt.hashSync(payload.password, saltRounds);
        }
        
        await user?.updateOne(payload);

        // user = await User.findById(id);
        
        return res.json({
            success: true,
            // user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }
    
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        await user?.delete();

        return res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }

}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
