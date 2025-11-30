// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-e-commerce-5-h0mz.onrender.com/api", // your backend base
  withCredentials: true,
});

export default api;
