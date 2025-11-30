🛍 Clothing Store Frontend
A modern and responsive React e-commerce frontend with user authentication, product browsing, cart, and orders.

✨ Features
Login / Register

Browse Products

Product Detail Page

Add to Cart (Cookies + JWT Auth)

Cart Page (Update Qty, Remove)

Checkout Page

Order History

Fully responsive UI


🧰 Tech Stack
React + Vite

Axios

React Router

Context API Authentication

CSS Modules



📦 Installation
Clone frontend:
git clone https://github.com/yourusername/frontend-ecommerce.git
cd frontend
npm install


🌐 Set Backend URL
Edit:
src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-e-commerce-5-h0mz.onrender.com",
  withCredentials: true
});
export default api;

▶️ Run Project
npm run dev
🚀 Build for Production
npm run build


Deploy build folder to:
Render

Netlify

Vercel (I used Vercel):https://frontend-e-commerce-5dqz.vercel.app/


📁 Project Structure
src/
│── components/
│── pages/
│── context/AuthContext.jsx
│── services/api.js
│── App.jsx
└── main.jsx