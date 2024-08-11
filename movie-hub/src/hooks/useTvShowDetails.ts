import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface TvShowDetails {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  genres: Array<{ id: number; name: string }>;
  created_by: Array<{ id: number; name: string; profile_path: string | null }>;
  networks: Array<{
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  seasons: Array<{
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    air_date: string;
    poster_path: string | null;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  homepage: string;
  popularity: number;
  tagline: string;
  episode_run_time: number[];
  in_production: boolean;
  type: string;
  original_language: string;
  original_name: string;
  origin_country: string[];
}

const useTvShowDetails = (id: string) => {
  return useQuery<TvShowDetails, AxiosError>({
    queryKey: ["tvShowDetails", id],
    queryFn: async () => {
      const response = await apiClient.get<TvShowDetails>(`/3/tv/${id}`);
      return response.data;
    },
  });
};

export default useTvShowDetails;
