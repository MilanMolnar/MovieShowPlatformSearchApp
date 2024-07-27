import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

const useGenres = () => {
  return useQuery<Genre[], AxiosError>({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await apiClient.get<GenresResponse>("/3/genre/tv/list");
      return response.data.genres;
    },
  });
};

export default useGenres;
