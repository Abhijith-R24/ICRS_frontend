import axios from "axios";

const API = axios.create({
  baseURL: "https://icrs-backend.onrender.com", // Replace with your backend URL (e.g., http://192.168.x.x:5000 or your server URL)
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
