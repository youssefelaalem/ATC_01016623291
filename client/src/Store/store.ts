import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './features/events/eventsSlice';
import AuthReduecer from "./features/Auth/AuthSlice"
import BookingReducer from "./features/Book/BookSlice"
const store = configureStore({
    reducer: {
        events: eventsReducer,
        Auth: AuthReduecer,
        Book: BookingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;