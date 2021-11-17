import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator"

const validateFields = (req: Request, res: Response, next: Function):any => {

    const error: Result<ValidationError> = validationResult(req);

    if(!error.isEmpty()) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error
        });
    }

    next();

}

export default validateFields;