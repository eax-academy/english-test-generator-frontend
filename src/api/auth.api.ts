import axios from "axios";
import { AUTH_API } from "../config/api.config";
import type { LoginRequest, RegisterRequest, AuthResponse, ForgotPasswordRequest } from "../types/types";


export const apiLogin = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${AUTH_API}/login`, data, { withCredentials: true });
    return response.data; 
};

export const apiAdminLogin = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${AUTH_API}/admin/login`, data, { withCredentials: true });
    return response.data;
};

export const apiRegister = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${AUTH_API}/register`, data, { withCredentials: true });
    return response.data;
};

export const apiLogout = async (): Promise<void> => {
    try {
        await axios.post(`${AUTH_API}/logout`, {}, { withCredentials: true });
    } catch (e) {
        console.error("Logout failed", e);
    } finally {
        console.log("Clearing local auth state");
    }
};

export const apiForgotPassword = async (data: ForgotPasswordRequest): Promise<void> => {
    await axios.post(`${AUTH_API}/forgot-password`, data);
};


