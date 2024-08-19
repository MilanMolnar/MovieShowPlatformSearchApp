import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
}

const useTvShowCredits = (id: string) => {
  return useQuery<Credits, AxiosError>({
    queryKey: ["tvShowCredits", id],
    queryFn: async () => {
      const response = await apiClient.get<Credits>(`/3/tv/${id}/credits`);
      return response.data;
    },
  });
};

export default useTvShowCredits;
