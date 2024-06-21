import { useState } from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import Spinner from "./Spinner";

interface Props {
  onSelectGenres: (genres: Genre[]) => void;
  onApply: () => void;
}

const GenreList = ({ onSelectGenres, onApply }: Props) => {
  const { data, error, loading } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.find((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre]
    );
  };

  const handleApplyClick = () => {
    onSelectGenres(selectedGenres);
    onApply();
  };

  const handleClearClick = () => {
    setSelectedGenres([]);
    onSelectGenres([]);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="flex justify-center">
        {selectedGenres.length > 0 ? (
          <button
            className="text-2xl font-semibold text-center m-4 underline text-blue-600 dark:text-white "
            onClick={handleApplyClick}
          >
            Apply
          </button>
        ) : (
          <p className="text-2xl font-semibold text-center m-4 dark:text-gray-300 ">
            Genres
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center ">
        {data.map((genre) => (
          <button
            key={genre.id}
            className={`m-2 p-2 shadow-gray-300 dark:shadow-gray-950 shadow-md ${
              selectedGenres.find((g) => g.id === genre.id)
                ? "bg-blue-300  dark:bg-gray-600 dark:text-white"
                : ""
            } dark:text-gray-300 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 `}
            onClick={() => handleGenreClick(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <div className="flex justify-center items-center">
          <button
            className=" bg-blue-200 dark:bg-gray-700 text-xl font-semibold text-center m-4 w-10 h-10 rounded-full shadow-gray-300 dark:shadow-black shadow-md dark:text-gray-300 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 "
            onClick={() => {
              handleClearClick();
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};
export default GenreList;
