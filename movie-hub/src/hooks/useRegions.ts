import useData from "./useData";

export interface Region {
  iso_3166_1: string;
  english_name: string;
}

const useRegions = () => {
  return useData<Region>("/3/watch/providers/regions");
};
export default useRegions;
