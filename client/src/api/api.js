import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api", // Backend URL
  withCredentials: true, // If you need to send cookies or handle authentication
});

export default API;