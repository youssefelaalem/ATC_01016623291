import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customError';

// Register a new user
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) throw new CustomError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    const { password: _removed, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
});

// Login a user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new CustomError('Invalid credentials', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError('Invalid credentials', 401);

    // console.log("JWT_SECRET", process.env.JWT_SECRET_KEY);
    const { password: _removed, ...userWithoutPassword } = user.toObject();
    const token = jwt.sign(
        { user: userWithoutPassword },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '1d' }
    );

    res.status(200).json({ token, user: userWithoutPassword });
});
