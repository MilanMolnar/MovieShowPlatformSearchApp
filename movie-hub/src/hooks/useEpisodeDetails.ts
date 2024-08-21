import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider"; // Import useLanguage hook

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
  const { language } = useLanguage(); // Get the current language from context

  // Map the language codes to TMDB-supported language codes
  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE", // Note: TMDB uses 'de' for German, so 'ge' is mapped to 'de'
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US"; // Default to "en-US" if language is not found

  return useQuery<EpisodeDetails, AxiosError>({
    queryKey: [
      "episodeDetails",
      seriesId,
      seasonNumber,
      episodeNumber,
      languageCode,
    ], // Include languageCode in queryKey
    queryFn: async () => {
      const response = await apiClient.get<EpisodeDetails>(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
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

export default useEpisodeDetails;
