// import { useUserStore } from "@/stores/userStore"; // Uncomment and adjust the import path as necessary
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;
      try {
        await api.get("/auth/refresh-token");
        return api(originalRequest);
      } catch (refreshError) {
        // useUserStore.getState().clearAuth(); // clear auth state on refresh token failure
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
