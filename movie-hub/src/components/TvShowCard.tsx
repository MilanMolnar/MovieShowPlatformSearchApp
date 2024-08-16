import React from "react";
import { TvShow } from "../hooks/useTvShows";
import placeholderImage from "../assets/logo.webp";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  tvShow: TvShow;
}

const TvShowCard: React.FC<Props> = ({ tvShow }) => {
  const imageUrl = tvShow.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`
    : placeholderImage;

  return (
    <Link to={`/tv/${tvShow.id}`}>
      <div className="p-4">
        <div
          className="card-inner relative h-64 overflow-hidden rounded-md transition-transform duration-300 ease-in-out hover:scale-[104%]"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-600 dark:from-gray-900 to-transparent"></div>
          <div className="absolute justify-between bottom-0 w-full h-15 flex items-center p-4 ">
            <h2 className="text-white text-xl font-bold">{tvShow.name}</h2>
            <Rating averageVote={tvShow.vote_average} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvShowCard;
