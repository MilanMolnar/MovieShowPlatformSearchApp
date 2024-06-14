import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchTvShowsResponse {
  count: number;
  next: string;
  previous: string;
  results: TvShow[];
}

interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

const useTvShows = () => {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FetchTvShowsResponse>("/3/tv/popular", { signal: controller.signal })
      .then((response) => {
        setTvShows(response.data.results);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return; // ignore canceled requests
        setError(error.message);
      });

    return () => controller.abort(); // cleanup function
  }, []);

  return { tvShows, error };
};

export default useTvShows;
