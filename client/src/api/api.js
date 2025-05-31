import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api", // Backend URL
  withCredentials: true, // If you need to send cookies or handle authentication
});
API.interceptors.request.use((req)=>{
  const token=localStorage.getItem("toen");
  if(token){
    req.headers.Authorization="Bearer ${token}";
  }return req;
});

export default API;