import  { Request, Response, NextFunction } from "express";
import status from "http-status";
import { loginSchema } from "../validators/login.schema";

export const validateLoginBody = (request: Request, response: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(request.body);

    if (error) {
        return response
            .status(status.BAD_REQUEST)
            .send({ error: error.details });
    }

    next();
};