import axiosInstance from '@/utils/axiosInstance';

export const createBooking = async (eventId: string) => {
    const response = await axiosInstance.post("/bookings", { eventId });
    return response.data;
};

export const fetchBookings = async () => {
    const response = await axiosInstance.get("/bookings");
    return response.data;
};
