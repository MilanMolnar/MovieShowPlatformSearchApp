import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider";

interface DisplayPriorities {
  [key: string]: number;
}

export interface Platform {
  display_priorities: DisplayPriorities;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

interface PlatformsResponse {
  results: Platform[];
}

const usePlatforms = (watch_region: string) => {
  const { language } = useLanguage();


  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE",
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US";

  return useQuery<Platform[], AxiosError>({
    queryKey: ["platforms", watch_region, languageCode], 
    queryFn: async () => {
      const params = {
        watch_region,
        language: languageCode,
      };

      const response = await apiClient.get<PlatformsResponse>(
        "/3/watch/providers/tv",
        { params }
      );
      return response.data.results;
    },
  });
};

export default usePlatforms;
