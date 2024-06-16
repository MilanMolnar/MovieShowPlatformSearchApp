import useData from "./useData";

interface DisplayPriorities {
  [key: string]: number;
}

interface Platform {
  display_priorities: DisplayPriorities;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

const usePlatforms = () => {
  return useData<Platform>("/3/watch/providers/tv");
};

export default usePlatforms;
