import express from 'express';
import { createBookingFun, getUserBookings } from '../controllers/booking.controller';
import { protect } from '../middlewares/auth.middelware';

const router = express.Router();

router.post('/', protect, createBookingFun);
router.get('/', protect, getUserBookings);

export default router;