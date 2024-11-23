import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { useLanguage } from "../providers/LanguageContextProvider";

export interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

const useGenres = () => {
  const { language } = useLanguage();

  const languageMap: { [key: string]: string } = {
    en: "en-US",
    hu: "hu-HU",
    es: "es-ES",
    ge: "de-DE",
    ja: "ja-JP",
  };

  const languageCode = languageMap[language] || "en-US";

  return useQuery<Genre[], AxiosError>({
    queryKey: ["genres", languageCode],
    queryFn: async () => {
      const response = await apiClient.get<GenresResponse>("/3/genre/tv/list", {
        params: {
          language: languageCode,
        },
      });
      return response.data.genres;
    },
  });
};

export default useGenres;
