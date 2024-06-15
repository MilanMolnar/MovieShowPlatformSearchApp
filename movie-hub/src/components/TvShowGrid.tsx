import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import usePopularTvShows from "../hooks/usePopularTvShows";
import TvShowCard from "./TvShowCard";

const TvShowGrid = () => {
  const { tvShows, error } = usePopularTvShows();
  return (
    <>
      {error && <div>{error}</div>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {tvShows.map((tvShow) => (
          <TvShowCard tvShow={tvShow}></TvShowCard>
        ))}
      </div>
    </>
  );
};

export default TvShowGrid;
