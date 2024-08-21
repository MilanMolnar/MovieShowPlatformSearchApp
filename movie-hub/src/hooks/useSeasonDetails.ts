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
  const { language } = useLanguage(); // Get the current language from context

  // Map the language codes to TMDB-supported language codes
  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE", // TMDB uses 'de' for German
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US"; // Default to "en-US" if language is not found

  return useQuery<Season, AxiosError>({
    queryKey: ["seasonDetails", tvShowId, seasonNumber, languageCode], // Include languageCode in queryKey to refetch when language changes
    queryFn: async () => {
      const response = await apiClient.get<Season>(
        `/3/tv/${tvShowId}/season/${seasonNumber}`,
        {
          params: {
            language: languageCode, // Pass language as a parameter
          },
        }
      );
      return response.data;
    },
  });
};

export default useSeasonDetails;
