import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./AuthThunks";



const userFromStorage = localStorage.getItem("user");

interface User {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin";
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    loading: false,
    error: null
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        //login
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload", action.payload);
                state.user = action.payload
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'there is issue with Login.';
            });
        //  register
        (builder)
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false;
                // state.user = action.payload
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'there is issue with Register.';
            });

    }
})
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;