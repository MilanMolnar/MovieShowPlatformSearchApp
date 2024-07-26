import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

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

const fetchData = async <T>(endpoint: string): Promise<T[]> => {
  const response = await apiClient.get<FetchResponse<T>>(endpoint);
  if ("genres" in response.data) {
    return response.data.genres;
  } else if ("results" in response.data) {
    return response.data.results;
  }
  return [];
};

const useData = <T>(endpoint: string) => {
  const query = useQuery<T[], AxiosError>({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
  });

  return {
    data: query.data ?? [],
    error: query.error ? query.error.message : "",
    loading: query.isLoading,
  };
};

export default useData;
