import type { Event } from '@/types/Events';
import axiosInstance from '@/utils/axiosInstance';
// import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchEventsAPI() {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/events/all_events`);
        return response.data.events;
    } catch (error: unknown) {
        let errorMessage = 'Failed to fetch events';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            // @ts-expect-error: Unreachable code error
            errorMessage = error.response?.data?.message || errorMessage;
        }

        throw new Error(errorMessage);
    }

}

export async function fetchSingleEventAPI(id: string) {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/events/${id}`);
        return response.data.data;
    } catch (error: unknown) {
        let errorMessage = 'Failed to fetch events';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            // @ts-expect-error: Unreachable code error
            errorMessage = error.response?.data?.message || errorMessage;
        }

        throw new Error(errorMessage);
    }

}

export async function createEventAPI(event: Event) {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/events/create`, event); // <-- use POST here
        return response.data.data;
    } catch (error: unknown) {
        let errorMessage = 'Failed to create event';
        console.log("==>", error);
        //@ts-expect-error there is a type mismqtch
        errorMessage = error.response?.data?.message || errorMessage;

        console.log("errorMessage", errorMessage);

        throw new Error(errorMessage);
    }
}
//update
export async function updateEventAPI(event: Event, id: string) {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/events/${id}`, event);
        return response.data.data;
    } catch (error: unknown) {
        let errorMessage = 'Failed to update event';
        console.log("update ==>", error);
        //@ts-expect-error there is a type mismqtch
        errorMessage = error.response?.data?.message || errorMessage;

        console.log("errorMessage", errorMessage);

        throw new Error(errorMessage);
    }
}
//delete
export async function deleteEventAPI(id: string) {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/events/${id}`);
        return response.data.data;
    } catch (error: unknown) {
        let errorMessage = 'Failed to delete event';
        console.log("update ==>", error);
        //@ts-expect-error there is a type mismqtch
        errorMessage = error.response?.data?.message || errorMessage;

        console.log("errorMessage", errorMessage);

        throw new Error(errorMessage);
    }
}