import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

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
  return useQuery<Platform[], AxiosError>({
    queryKey: ["platforms", watch_region],
    queryFn: async () => {
      const params = {
        watch_region,
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
