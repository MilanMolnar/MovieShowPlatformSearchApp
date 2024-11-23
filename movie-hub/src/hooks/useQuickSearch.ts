import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider"; // Import useLanguage hook

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
  const { language } = useLanguage();

  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE",
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US";

  const query = useInfiniteQuery<SearchResponse, AxiosError>({
    queryKey: ["quickSearch", searchQuery, languageCode],
    queryFn: async ({ pageParam = 1 }) => {
      const params = {
        query: searchQuery,
        include_adult: true,
        language: languageCode,
        page: pageParam,
      };

      const response = await apiClient.get<SearchResponse>("/3/search/tv", {
        params,
      });
      return response.data;
    },
    enabled: !!searchQuery,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
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
