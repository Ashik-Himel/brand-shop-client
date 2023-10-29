import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://brand-shop-server.vercel.app',
  withCredentials: true,
})