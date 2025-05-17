import { createSlice } from '@reduxjs/toolkit';
import { createEventThunk, deleteEventThunk, fetchEvents, fetchSingleEvent, updateEventThunk } from './eventsThunks';

interface Event {
    _id: string;
    name: string;
    description: string;
    category: string[];
    date: Date;
    venue: string;
    price: number;
    image: string;

}

interface EventsState {
    events: Event[];
    loading: boolean;
    singleEvent: Event | null,
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    singleEvent: null,
    loading: false,
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get all events
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch events';
            });
        //get single event 
        builder
            .addCase(fetchSingleEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload;
            })
            .addCase(fetchSingleEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // insert New Event
        builder
            .addCase(createEventThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEventThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload;
            })
            .addCase(createEventThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch events';
            });
        //update event
        builder
            .addCase(updateEventThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEventThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload;
            })
            .addCase(updateEventThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update event';
            });
        //delete
        builder
            .addCase(deleteEventThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEventThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload;
            })
            .addCase(deleteEventThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to delete event';
            });

    },
});

export default eventsSlice.reducer;
