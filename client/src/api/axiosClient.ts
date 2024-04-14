import axios, { AxiosError } from "axios";
import { AxiosUserResponse } from "./types";

const BASE_URL = "http://localhost:3001/api/v1";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response as AxiosUserResponse;
  },
  (error: AxiosError) => {
    throw error;
  }
);

export default axiosClient;
