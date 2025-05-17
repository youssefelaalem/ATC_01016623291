import { createSlice } from '@reduxjs/toolkit';
import { createBookingThunk, fetchBookingsThunk } from './BookThunk';
import type { Booking } from '@/types/booking';

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}


const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.data;
            })
            .addCase(fetchBookingsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        //book create
        builder
            .addCase(createBookingThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload.data);
            })
            .addCase(createBookingThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default bookingSlice.reducer;
