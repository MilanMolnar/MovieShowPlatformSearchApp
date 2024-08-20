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

  const languageCode = language === "en" ? "en-US" : "hu-HU"; // Convert to appropriate locale code

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
