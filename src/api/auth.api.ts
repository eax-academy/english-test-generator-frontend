import axios from "axios";
import { AUTH_API } from "../config/api.config";
import type { LoginRequest, RegisterRequest, AuthResponse, ForgotPasswordRequest } from "../types/types";

// Helper to get auth header
export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiLogin = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${AUTH_API}/login`, data);
    return response.data;
};

export const apiAdminLogin = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${AUTH_API}/admin/login`, data);
    return response.data;
};

export const apiRegister = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${AUTH_API}/register`, data);
    return response.data;
};

export const apiForgotPassword = async (data: ForgotPasswordRequest): Promise<void> => {
    await axios.post(`${AUTH_API}/forgot-password`, data);
};

export const apiLogout = async () => {
    try {
        await axios.post(`${AUTH_API}/logout`, {}, { headers: getAuthHeader() });
    } catch (e) {
        console.error("Logout failed", e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
