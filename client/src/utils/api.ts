import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 5000,
});

export default api;
