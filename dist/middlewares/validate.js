"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const validatedBody = await schema.parseAsync(req.body);
            req.body = validatedBody;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    status: 'fail',
                    errors: error.issues.map((err) => ({
                        field: err.path[0],
                        message: err.message
                    }))
                });
            }
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
    };
};
exports.validate = validate;
