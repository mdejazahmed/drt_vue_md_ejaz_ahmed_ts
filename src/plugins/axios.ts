import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useSnackbarStore } from "@/stores/app";

// Define interfaces for the response data structure
interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  [key: string]: any;
}

// Extend AxiosRequestConfig to include any custom config options
interface CustomRequestConfig extends AxiosRequestConfig {
  // Add any custom request config options here
}

// Create axios instance with type
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: CustomRequestConfig) => {
    const token = "token";
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

const formatErrorMessage = (error: AxiosError<ApiResponse>): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || 'An error occurred';
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (!error.response) {
      console.error("Network Error:", error.message);
      return Promise.reject(new Error("Network error. Please check your internet connection."));
    }
    
    const { status, data } = error.response;
    const errorMessage = data?.message || error.message || "An error occurred";
    const snackbarStore = useSnackbarStore();
    
    switch (status) {
      case 404:
        snackbarStore.showSnackbar({ msg: "Url is wrong", color: "error" });
        break;
      case 500:
      case 401:
      case 403:
      case 429:
        snackbarStore.showSnackbar({ msg: errorMessage, color: "error" });
        break;
      default:
        snackbarStore.showSnackbar({ msg: errorMessage, color: "error" });
        break;
    }
    
    throw new Error(formatErrorMessage(error));
  }
);

export default axiosInstance;
