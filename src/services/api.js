// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-e-commerce-5-h0mz.onrender.com/api", // your backend base
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
