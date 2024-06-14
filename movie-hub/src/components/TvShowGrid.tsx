import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

interface FetchGamesResponse {
  count: number;
  next: string;
  previous: string;
  results: TvShow[];
}

const TvShowGrid = () => {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/3/tv/popular")
      .then((response) => {
        setTvShows(response.data.results);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <ul>
        {tvShows.map((tvShow) => (
          <li key={tvShow.id}>
            <h2>{tvShow.name}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TvShowGrid;
