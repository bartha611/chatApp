import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  console.log(token);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;