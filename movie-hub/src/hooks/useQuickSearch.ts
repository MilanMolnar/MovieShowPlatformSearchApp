// useQuickSearch.ts
import { useInfiniteQuery } from "@tanstack/react-query";
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
  page: number;
  results: TvShow[];
  total_pages: number;
}

const useQuickSearch = (searchQuery: string) => {
  const query = useInfiniteQuery<SearchResponse, AxiosError>({
    queryKey: ["quickSearch", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get<SearchResponse>(
        `/3/search/tv?query=${searchQuery}&include_adult=true&language=en-US&page=${pageParam}`
      );
      return response.data;
    },
    enabled: !!searchQuery,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1, // Added this line to specify the initial page parameter
  });

  return {
    data: query.data?.pages.flatMap((page) => page.results) ?? [],
    error: query.error ? query.error.message : "",
    isLoading: query.isLoading,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};

export default useQuickSearch;
