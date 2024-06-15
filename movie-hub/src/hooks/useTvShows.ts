import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchTvShowsResponse {
  count: number;
  next: string;
  previous: string;
  results: TvShow[];
}

export interface TvShow {
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchTvShowsResponse>("/3/discover/tv?language=hu-HU", {
        signal: controller.signal,
      })
      .then((response) => {
        setTvShows(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return; // ignore canceled requests
        setError(error.message);
        setLoading(false);
      });

    return () => controller.abort(); // cleanup function
  }, []);

  return { tvShows, error, loading };
};

export default useTvShows;
