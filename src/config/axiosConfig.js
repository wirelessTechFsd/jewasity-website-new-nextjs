import axios from "axios";

export const SERVER_URL = "https://jewasity-prod-server.jewasity.com";
// const SERVER_URL = 'http://54.91.91.58:4000';
// const SERVER_URL = 'https://jewasity-backend.vercel.app';
// export const SERVER_URL = "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
});

export default axiosInstance;
