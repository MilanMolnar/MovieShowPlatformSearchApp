import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

interface DisplayPriorities {
  [key: string]: number;
}

export interface Provider {
  display_priorities: DisplayPriorities;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

interface RegionProviders {
  link: string;
  flatrate: Provider[];
}

interface ProvidersResponse {
  results: {
    [region: string]: RegionProviders;
  };
}

const useProviders = (
  tv_show_id: number,
  season_number: number,
  watch_region: string | null
) => {
  // Default to region "HU" if watch_region is null
  const region = watch_region || "HU";

  return useQuery<Provider[], AxiosError>({
    queryKey: ["providers", tv_show_id, season_number, region],
    queryFn: async () => {
      const response = await apiClient.get<ProvidersResponse>(
        `/3/tv/${tv_show_id}/season/${season_number}/watch/providers`
      );

      // Extract the providers array from the specified region's flatrate property
      const regionProviders = response.data.results[region];
      return regionProviders?.flatrate || [];
    },
  });
};

export default useProviders;