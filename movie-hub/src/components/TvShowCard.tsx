import React from "react";
import { TvShow } from "../hooks/useTvShows";
import placeholderImage from "../assets/logo.webp";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  tvShow: TvShow;
}

const TvShowCard = ({ tvShow }: Props) => {
  const imageUrl = tvShow.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`
    : placeholderImage;

  return (
    <Link to={`/tv/${tvShow.id}`}>
      <div className="p-4 group">
        <div className="card-inner relative h-64 overflow-hidden rounded-md transition-transform duration-300 ease-in-out hover:scale-[100%]">
          {/* Background image with its own zoom animation */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-600 dark:from-gray-900 to-transparent" />
          {/* Content */}
          <div className="absolute justify-between bottom-0 w-full h-15 flex items-center p-4">
            <h2 className="text-gray-300 group-hover:text-white transition-colors duration-300 ease-in-out text-xl font-bold">
              {tvShow.name}
            </h2>
            <Rating averageVote={tvShow.vote_average} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvShowCard;
