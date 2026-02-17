import axios from "axios";

const api = axios.create({
  baseURL: "https://real-time-poll-room-production.up.railway.app"
});

export default api;
