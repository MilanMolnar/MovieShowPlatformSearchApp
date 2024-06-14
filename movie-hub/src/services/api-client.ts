import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDJjN2RkZGU5MzQ5MDVkOGMwYjNkYTZjNTY4MWYzYSIsInN1YiI6IjY2NmMyNDliN2QzOTFlMDBiNTcwZGQ4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.spqeMYGDjzX-SR1B9EUEEfP9nmPzIfHZeI_iMY05izs",
  },
});

export default apiClient;
