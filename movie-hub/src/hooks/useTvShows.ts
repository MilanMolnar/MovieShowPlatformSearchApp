import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { Genre } from "./useGenres";
import { Platform } from "./usePlatforms";
import { Region } from "./useRegions";

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

interface TvShowsResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

const useTvShows = (
  genres: Genre[],
  selectedRegion: Region,
  selectedPlatform: Platform | null
) => {
  const genreIds = genres.map((genre) => genre.id).join(",");

  const query = useInfiniteQuery<TvShowsResponse, AxiosError>({
    queryKey: ["tvShows", genres, selectedRegion, selectedPlatform],
    queryFn: async ({ pageParam = 1 }) => {
      const params: any = {
        include_adult: true,
        language: "en-US",
        page: pageParam,
        sort_by: "popularity.desc",
        with_watch_monetization_types: "flatrate|buy|free|rent|ads",
      };

      if (selectedRegion) {
        params.watch_region = selectedRegion.iso_3166_1;
      }

      if (genreIds) {
        params.with_genres = genreIds;
      }

      if (selectedPlatform) {
        params.with_watch_providers = selectedPlatform.provider_id;
      }

      const response = await apiClient.get<TvShowsResponse>("/3/discover/tv", {
        params,
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
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

export default useTvShows;
