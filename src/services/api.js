// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-e-commerce-4-cpgy.onrender.com/api", // your backend base
  withCredentials: true,
});

export default api;
