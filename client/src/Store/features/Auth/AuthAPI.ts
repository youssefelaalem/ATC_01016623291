import axiosInstance from "@/utils/axiosInstance";

interface LoginData {
    email: string;
    password: string;
}
interface registerData extends LoginData {
    username: string;
}


export async function loginAPI(data: LoginData) {
    try {
        const response = await axiosInstance.post(`/users/login`, data);
        console.log("res ", response);
        if (response?.data?.token)
            localStorage.setItem("token", response?.data?.token)
        return response.data.user;
    } catch (error: unknown) {
        let errorMessage = 'Failed to login';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            // @ts-expect-error: Unreachable code error
            errorMessage = error.response?.data?.message || errorMessage;
        }

        throw new Error(errorMessage);
    }

}

export async function registerAPI(data: registerData) {
    try {
        const response = await axiosInstance.post(`/users/register`, data);
        console.log("res ", response);
        // if (response?.data?.token)
        //     localStorage.setItem("token", response?.data?.token)
        return response.data.user;
    } catch (error: unknown) {
        let errorMessage = 'Failed to register';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            // @ts-expect-error: Unreachable code error
            errorMessage = error.response?.data?.message || errorMessage;
        }

        throw new Error(errorMessage);
    }

}