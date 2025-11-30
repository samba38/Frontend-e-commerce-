// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-e-commerce-3-u60q.onrender.com/api", // your backend base
  withCredentials: true,
});

export default api;
