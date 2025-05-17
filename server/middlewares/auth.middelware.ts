import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

interface UserPayload extends JwtPayload {
    id: string;
    role: "admin" | "user";
}

export interface AuthenticatedRequest extends Request {
    user?: UserPayload;

}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new CustomError("You are not logged in", 401));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new CustomError("You are not logged in", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return next(new CustomError("Invalid or Expired token", 401));
    }
}



//for admin 
export const restrictToAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("req user=> ", req.user);
    console.log("req role=> ", req.user.role);

    if (req?.user?.user?.role !== "admin") {
        return next(new CustomError("You do not have permission to perform this action", 403));
    }

    next();
}
