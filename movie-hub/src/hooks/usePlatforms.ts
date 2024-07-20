import useData from "./useData";

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

const usePlatforms = (watch_region: string) => {
  return useData<Platform>(
    `/3/watch/providers/tv?watch_region=${watch_region}`
  );
};

export default usePlatforms;
