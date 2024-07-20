import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDJjN2RkZGU5MzQ5MDVkOGMwYjNkYTZjNTY4MWYzYSIsIm5iZiI6MTcyMTUwMDM1NS4xNDU1NjIsInN1YiI6IjY2NmMyNDliN2QzOTFlMDBiNTcwZGQ4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SOCsWUOL16D2mfGRB7oIKGRz_NCneDr8bvpQJZOKzJo",
  },
});

export default apiClient;
