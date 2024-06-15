import useData from "./useData";
import { Genre } from "./useGenres";

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

const useTvShows = (genres: Genre[]) => {
  const genreIds = genres.map((genre) => genre.id).join(",");
  console.log(genreIds);

  return useData<TvShow>(
    `/3/discover/tv?language=hu-HU&with_genres=${genreIds}`
  );
};

export default useTvShows;
