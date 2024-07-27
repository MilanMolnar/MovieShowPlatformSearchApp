// useQuickSearch.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

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

interface SearchResponse {
  results: TvShow[];
}

const useQuickSearch = (searchQuery: string) => {
  const query = useQuery<TvShow[], AxiosError>({
    queryKey: ["quickSearch", searchQuery],
    queryFn: async () => {
      const response = await apiClient.get<SearchResponse>(
        `/3/search/tv?query=${searchQuery}&include_adult=true&language=en-US&page=1`
      );
      return response.data.results;
    },
    enabled: !!searchQuery,
  });

  return {
    data: query.data ?? [],
    error: query.error ? query.error.message : "",
    isLoading: query.isLoading,
  };
};

export default useQuickSearch;
