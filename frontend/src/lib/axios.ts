import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL === "delopment"
      ? " http://localhost:5000/api"
      : "api",
  withCredentials: true,
});
