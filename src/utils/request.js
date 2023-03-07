import axios from "axios";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_URL,
  timeout: 60000,
  header: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("err" ,  error.response);
    return Promise.reject(error);
  }
);

export default request;
