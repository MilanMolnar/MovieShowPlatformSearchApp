import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface TvShowDetails {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
}

const useTvShowDetails = (id: string) => {
  return useQuery<TvShowDetails, AxiosError>({
    queryKey: ["tvShowDetails", id],
    queryFn: async () => {
      const response = await apiClient.get<TvShowDetails>(`/3/tv/${id}`);
      return response.data;
    },
  });
};

export default useTvShowDetails;
