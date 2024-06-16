import useData from "./useData";
import { Genre } from "./useGenres";
import { Platform } from "./usePlatforms";

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

const useTvShows = (genres: Genre[], selectedPlatform: Platform | null) => {
  const genreIds = genres.map((genre) => genre.id).join(",");
  console.log(genreIds);

  if (!selectedPlatform) {
    return useData<TvShow>(`/3/discover/tv?with_genres=${genreIds}`);
  }

  return useData<TvShow>(
    //generate an endpoint with the selected genres and platform for the movie database api
    `/3/discover/tv?include_adult=true&language=en-US&page=1&sort_by=popularity.desc&watch_region=HU&with_genres=${genreIds}&with_watch_monetization_types=flatrate%7Cbuy%7Cfree%7Crent%7Cads&with_watch_providers=${selectedPlatform?.provider_id}`
  );
};

export default useTvShows;
