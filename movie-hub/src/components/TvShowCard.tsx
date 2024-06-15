import { TvShow } from "../hooks/useTvShows";
import placeholderImage from "../assets/logo.webp"; // replace with the actual path to your placeholder image
import Rating from "./Rating";

interface Props {
  tvShow: TvShow;
}

const TvShowCard = ({ tvShow }: Props) => {
  const imageUrl = tvShow.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`
    : placeholderImage;

  return (
    <div className=" p-4">
      <div
        className="relative h-64 overflow-hidden shadow-gray-500 dark:shadow-gray-900 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute justify-between bottom-0 w-full h-15 bg-white bg-opacity-20 backdrop-blur-sm flex items-center p-4 bg-gradient-to-b from-transparent to-gray-700">
          <h2 className="text-white text-xl font-bold ">{tvShow.name}</h2>
          <Rating averageVote={tvShow.vote_average} />
        </div>
      </div>
    </div>
  );
};

export default TvShowCard;
