import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  genres: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenresResponse>("/3/genre/tv/list", {
        signal: controller.signal,
      })
      .then((response) => {
        setGenres(response.data.genres);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    return () => controller.abort(); // cleanup function
  }, []);

  return { genres, error, loading };
};

export default useGenres;
