import { Request, Response } from "express";
import { Role } from "../models";


const getRoles = async (req: Request, res: Response): Promise<Response> => {

    try {

        const roles = await Role.find();

        return res.json({
            success: true,
            roles
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false
        });
    }

}


export {
    getRoles,
}
