import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import useTvShows from "../hooks/useTvShows";

const TvShowGrid = () => {
  const { tvShows, error } = useTvShows();
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
