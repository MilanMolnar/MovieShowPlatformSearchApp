import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface Region {
  iso_3166_1: string;
  english_name: string;
}

interface RegionsResponse {
  results: Region[];
}

const useRegions = () => {
  return useQuery<Region[], AxiosError>({
    queryKey: ["regions"],
    queryFn: async () => {
      const response = await apiClient.get<RegionsResponse>(
        "/3/watch/providers/regions"
      );
      return response.data.results;
    },
  });
};

export default useRegions;
