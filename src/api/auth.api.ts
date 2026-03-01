import axios from "axios";
import { AUTH_API } from "../config/api.config";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ChangePasswordRequest,
} from "../types/types";

export const apiLogin = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${AUTH_API}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const apiAdminLogin = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await axios.post(`${AUTH_API}/admin/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const apiRegister = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await axios.post(`${AUTH_API}/register`, data, {
    withCredentials: true,
  });
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

/**
 * Request a reset link
 * Sends only the email to the backend.
 */
export const apiForgotPassword = async (
  data: { email: string } 
): Promise<void> => {
  await axios.post(`${AUTH_API}/forgot-password`, data);
};

/**
 * Submit the new password
 * Uses the secret token from the URL to verify the user.
 */
export const apiResetPassword = async (
  token: string,
  data: { password: string }
): Promise<void> => {
  await axios.post(`${AUTH_API}/reset-password/${token}`, data);
};

export const apiChangePassword = async (
  data: ChangePasswordRequest,
): Promise<{ message: string }> => {
  // We use withCredentials: true because the route is protected by verifyToken (cookie-based)
  const response = await axios.post(`${AUTH_API}/change-password`, data, {
    withCredentials: true,
  });
  return response.data;
};
