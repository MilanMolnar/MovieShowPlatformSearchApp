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

  const languageCode = language === "en" ? "en-US" : "hu-HU"; // Convert to appropriate locale code

  return useQuery<Region[], AxiosError>({
    queryKey: ["regions", languageCode], // Include languageCode in queryKey
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
