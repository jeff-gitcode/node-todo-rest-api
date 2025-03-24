import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({
                errors: error.details.map((detail) => ({
                    message: detail.message,
                    path: detail.path,
                })),
            });
            return; // Ensure the function exits after sending a response
        }
        next(); // Call next() if validation passes
    };
};