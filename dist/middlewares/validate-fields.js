"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateFields = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error
        });
    }
    next();
};
exports.default = validateFields;
//# sourceMappingURL=validate-fields.js.map