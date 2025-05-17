import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middelware';
import asyncHandler from 'express-async-handler';
import Booking from '../models/booking.model';
import { CustomError } from '../utils/customError';


export const createBookingFun = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { eventId } = req.body;
    const userId = req.user?.user?._id;
    console.log("userId", userId);

    if (!userId || !eventId) {
        throw new CustomError("User ID and Event ID are required", 400);
    }
    const newBooking = await Booking.create({
        user: userId,
        event: eventId,
        status: true
    });

    if (!newBooking) {
        throw new CustomError("Booking creation failed", 500);
    }

    res.status(201).json({ status: "success", data: newBooking });
})


export const getUserBookings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.user?._id;

    const bookings = await Booking.find({ user: userId }).populate('event');
    if (!bookings) {
        throw new CustomError("No bookings found for this user", 404);
    }
    res.status(200).json({ status: "success", data: bookings });

});