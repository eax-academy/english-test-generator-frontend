// src/services/api.ts

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ AUTH API

export const registerUser = (formData: any) =>
  API.post("/api/v1/register", formData);

export const loginUser = (formData: any) =>
  API.post("/api/v1/login", formData);

export const forgotPassword = (formData: any) =>
  API.post("/api/v1/forgot-password", formData);

export const resetPassword = (formData: any) =>
  API.post("/api/v1/reset-password", formData);

export default API;
