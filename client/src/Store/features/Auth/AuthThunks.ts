import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "./AuthAPI";


interface LoginData {
    email: string;
    password: string;
}

interface registerData extends LoginData {
    username: string;
}

export const loginThunk = createAsyncThunk("auth/loginAction", async (data: LoginData) => {
    const loginRes = await loginAPI(data);
    return loginRes;
})


export const registerThunk = createAsyncThunk("auth/registerAction", async (data: registerData) => {
    const registerRes = await registerAPI(data);
    return registerRes
})