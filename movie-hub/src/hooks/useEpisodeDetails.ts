// hooks/useEpisodeDetails.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface EpisodeDetails {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  crew: Array<{
    id: number;
    credit_id: string;
    name: string;
    department: string;
    job: string;
    profile_path: string | null;
  }>;
  guest_stars: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
}

const useEpisodeDetails = (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  return useQuery<EpisodeDetails, AxiosError>({
    queryKey: ["episodeDetails", seriesId, seasonNumber, episodeNumber],
    queryFn: async () => {
      const response = await apiClient.get<EpisodeDetails>(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`
      );
      return response.data;
    },
  });
};

export default useEpisodeDetails;
