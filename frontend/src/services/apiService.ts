import axios from 'axios';
import { API_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set authorization token from localStorage
const setAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Call setAuthToken initially to set the token if it exists in localStorage
setAuthToken();

// Intercept requests to set the authorization token if token changes
axiosInstance.interceptors.request.use(function (config) {
  setAuthToken();
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;