import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-backend-xhak.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const token = JSON.parse(storedUser).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
