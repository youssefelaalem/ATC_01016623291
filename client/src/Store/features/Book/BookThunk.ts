
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking, fetchBookings } from './BookAPI';

export const createBookingThunk = createAsyncThunk(
    'bookings/createBooking',
    async (eventId: string, { rejectWithValue }) => {
        try {
            const data = await createBooking(eventId);
            return data;
        } catch (error: unknown) {
            // @ts-expect-error: Unreachable code error
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchBookingsThunk = createAsyncThunk(
    'bookings/fetchBookings',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchBookings();
            return data;
        } catch (error: unknown) {
            // @ts-expect-error: Unreachable code error
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
