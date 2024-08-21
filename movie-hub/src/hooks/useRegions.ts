import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider"; // Import useLanguage hook

export interface Region {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

interface RegionsResponse {
  results: Region[];
}

const useRegions = () => {
  const { language } = useLanguage(); // Get the current language from context

  // Map the language codes to TMDB-supported language codes
  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE", // TMDB uses 'de' for German, so 'ge' is mapped to 'de'
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US"; // Default to "en-US" if language is not found

  return useQuery<Region[], AxiosError>({
    queryKey: ["regions", languageCode], // Include languageCode in queryKey to refetch when language changes
    queryFn: async () => {
      const response = await apiClient.get<RegionsResponse>(
        "/3/watch/providers/regions",
        {
          params: {
            language: languageCode, // Pass language as a parameter
          },
        }
      );
      return response.data.results;
    },
  });
};

export default useRegions;
