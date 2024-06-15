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

const useTvShows = () => useData<TvShow>("/3/discover/tv?language=hu-HU");

export default useTvShows;
