import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider";

export interface Region {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

interface RegionsResponse {
  results: Region[];
}

const useRegions = () => {
  const { language } = useLanguage();
  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE",
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US";

  return useQuery<Region[], AxiosError>({
    queryKey: ["regions", languageCode],
    queryFn: async () => {
      const response = await apiClient.get<RegionsResponse>(
        "/3/watch/providers/regions",
        {
          params: {
            language: languageCode,
          },
        }
      );
      return response.data.results;
    },
  });
};

export default useRegions;
