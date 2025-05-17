import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEventAPI, deleteEventAPI, fetchEventsAPI, fetchSingleEventAPI, updateEventAPI } from './eventsAPI';
import type { Event } from '@/types/Events';
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const events = await fetchEventsAPI();
    return events;
});


export const fetchSingleEvent = createAsyncThunk('events/fetchSingleEvent', async (id: string) => {
    const events = await fetchSingleEventAPI(id);
    return events;
});


export const createEventThunk = createAsyncThunk(
    'events/create',
    async (event: Event, { rejectWithValue }) => {
        try {
            const data = await createEventAPI(event);
            return data;
        } catch (error: unknown) {
            console.log("events/create error", error);
            // @ts-expect-error: Unreachable code error
            return rejectWithValue(error.message || 'Failed to create event');
        }
    }
);

//update

export const updateEventThunk = createAsyncThunk(
    'events/update',
    async ({ event, id }: { event: Event; id: string }, { rejectWithValue }) => {
        try {
            const data = await updateEventAPI(event, id);
            return data;
        } catch (error: unknown) {
            console.log("events/update error", error);
            // @ts-expect-error: Unreachable code error
            return rejectWithValue(error.message || 'Failed to update event');
        }
    }
);

//delete
export const deleteEventThunk = createAsyncThunk(
    'events/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await deleteEventAPI(id);
            return data;
        } catch (error: unknown) {
            console.log("events/delete error", error);
            // @ts-expect-error: Unreachable code error
            return rejectWithValue(error.message || 'Failed to delete event');
        }
    }
);