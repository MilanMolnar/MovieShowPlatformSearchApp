import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider"; // Import useLanguage hook

export interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

const useGenres = () => {
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

  return useQuery<Genre[], AxiosError>({
    queryKey: ["genres", languageCode], // Include languageCode in queryKey
    queryFn: async () => {
      const response = await apiClient.get<GenresResponse>("/3/genre/tv/list", {
        params: {
          language: languageCode, // Pass language as a parameter
        },
      });
      return response.data.genres;
    },
  });
};

export default useGenres;
