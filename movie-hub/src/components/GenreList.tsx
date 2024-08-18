import { useState } from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import Spinner from "./Spinner";
import TMDBComply from "./TMDBComply";

interface Props {
  onSelectGenres: (genres: Genre[]) => void;
}

const GenreList = ({ onSelectGenres }: Props) => {
  const { data, error, isLoading } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenres((prev) => {
      const isSelected = prev.find((g) => g.id === genre.id);
      const updatedGenres = isSelected
        ? prev.filter((g) => g.id !== genre.id) // Deselect
        : [...prev, genre]; // Select

      onSelectGenres(updatedGenres); // Update the parent component immediately
      return updatedGenres;
    });
  };

  const handleClearClick = () => {
    setSelectedGenres([]);
    onSelectGenres([]);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-center mt-9 overflow-hidden">
        <p
          className={`text-3xl select-none font-bold text-center mt-[9px] mx-4 mb-4 ${
            selectedGenres.length > 0
              ? "text-gray-900 dark:text-gray-300 underline" // Lighter shade when at least one genre is selected
              : "text-gray-900 dark:text-gray-300 " // Default color when no genre is selected
          }`}
        >
          Genres
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.map((genre) => (
          <button
            key={genre.id}
            className={`m-2 p-2 shadow-gray-300 dark:shadow-gray-950 shadow-md ${
              selectedGenres.find((g) => g.id === genre.id)
                ? "bg-blue-300  dark:bg-gray-600 dark:text-white"
                : ""
            } dark:text-gray-300 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-[102%] `}
            onClick={() => handleGenreClick(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <TMDBComply />
    </>
  );
};

export default GenreList;
