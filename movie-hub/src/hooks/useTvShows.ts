// useTvShows.ts
import { useQuery } from "@tanstack/react-query";
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
  results: TvShow[];
}

const useTvShows = (
  genres: Genre[],
  selectedRegion: Region,
  selectedPlatform: Platform | null
) => {
  const genreIds = genres.map((genre) => genre.id).join(",");

  const query = useQuery<TvShow[], AxiosError>({
    queryKey: ["tvShows", genres, selectedRegion, selectedPlatform],
    queryFn: async () => {
      let endpoint =
        "/3/discover/tv?include_adult=true&language=en-US&page=1&sort_by=popularity.desc";

      if (selectedRegion) {
        endpoint += `&watch_region=${selectedRegion.iso_3166_1}`;
      }

      if (genreIds) {
        endpoint += `&with_genres=${genreIds}`;
      }

      if (selectedPlatform) {
        endpoint += `&with_watch_providers=${selectedPlatform.provider_id}`;
      }

      endpoint +=
        "&with_watch_monetization_types=flatrate%7Cbuy%7Cfree%7Crent%7Cads";

      const response = await apiClient.get<TvShowsResponse>(endpoint);
      return response.data.results;
    },
  });

  return {
    data: query.data ?? [],
    error: query.error ? query.error.message : "",
    isLoading: query.isLoading,
  };
};

export default useTvShows;
