import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // 🔥 REQUIRED
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn("Session expired. Redirecting to login...");
      
      // Optional cleanup
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default API;