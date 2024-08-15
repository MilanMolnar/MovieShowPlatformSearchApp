import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN || "";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_TOKEN,
  },
});

export default apiClient;
