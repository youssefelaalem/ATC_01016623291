import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

export  const globalErrorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let status = "error";

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
        status = err.status;

        if (err.isOperational) {
            return res.status(statusCode).json({
                status,
                message,
            });
        }
    }

    console.error("UNEXPECTED ERROR", err);

    return res.status(statusCode).json({
        status: "error",
        message,
    });
};
