import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface PaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

interface GenresResponse<T> {
  genres: T[];
}

type FetchResponse<T> = PaginatedResponse<T> | GenresResponse<T>;

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
      })
      .then((response) => {
        console.log(response);

        if ("genres" in response.data) {
          setData(response.data.genres);
        } else if ("results" in response.data) {
          setData(response.data.results);
        }

        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return; // ignore canceled requests
        setError(error.message);
        setLoading(false);
      });

    return () => controller.abort(); // cleanup function
  }, []);

  console.log(data);

  return { data, error, loading };
};

export default useData;
