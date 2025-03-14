import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider"; // Import useLanguage hook

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
  const { language } = useLanguage(); 


  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE",
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US";

  return useQuery<Season, AxiosError>({
    queryKey: ["seasonDetails", tvShowId, seasonNumber, languageCode],
    queryFn: async () => {
      const response = await apiClient.get<Season>(
        `/3/tv/${tvShowId}/season/${seasonNumber}`,
        {
          params: {
            language: languageCode,
          },
        }
      );
      return response.data;
    },
  });
};

export default useSeasonDetails;
