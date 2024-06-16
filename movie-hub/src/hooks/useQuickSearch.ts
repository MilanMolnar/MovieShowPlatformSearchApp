import useData from "./useData";

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

const useQuickSearch = (searchQuery: string) => {
  if (searchQuery) {
    return useData<TvShow>(
      `/3/search/tv?query=${searchQuery}&include_adult=true&language=en-US&page=1`
    );
  }
  return useData<TvShow>(
    `/3/search/tv?query=&include_adult=true&language=en-US&page=1`
  );
};

export default useQuickSearch;
