import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

// Define the structure of the season data
export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  season_number: number;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  air_date: string;
  episodes: Episode[];
}

const useSeasonDetails = (tvShowId: number, seasonNumber: number) => {
  return useQuery<Season, AxiosError>({
    queryKey: ["seasonDetails", tvShowId, seasonNumber],
    queryFn: async () => {
      const response = await apiClient.get<Season>(
        `/3/tv/${tvShowId}/season/${seasonNumber}`,
        {
          params: {
            language: "en-US",
          },
        }
      );
      return response.data;
    },
  });
};

export default useSeasonDetails;
