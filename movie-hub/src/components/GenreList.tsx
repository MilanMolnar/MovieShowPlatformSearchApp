import { useState } from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import Spinner from "./Spinner";
import TMDBComply from "./TMDBComply";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../providers/LanguageContextProvider";

interface Props {
  onSelectGenres: (genres: Genre[]) => void;
}

const GenreList = ({ onSelectGenres }: Props) => {
  type GenreTranslationMap = {
    [key: string]: {
      [genreName: string]: string;
    };
  };
  const genreTranslations: GenreTranslationMap = {
    en: {
      "Action & Adventure": "Action & Adventure",
      News: "News",
      Reality: "Reality",
      "Sci-Fi & Fantasy": "Sci-Fi & Fantasy",
      Soap: "Soap",
      Talk: "Talk",
      "War & Politics": "War & Politics",
    },
    hu: {
      "Action & Adventure": "Akció és Kaland",
      News: "Hírek",
      Reality: "Valós",
      "Sci-Fi & Fantasy": "Fantázia",
      Soap: "Szappanopera",
      Talk: "Kibeszélő",
      "War & Politics": "Politika",
      Kids: "Gyerek",
    },
  };
  const { t } = useTranslation();
  const { data, error, isLoading } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const { language } = useLanguage(); 

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenres((prev) => {
      const isSelected = prev.find((g) => g.id === genre.id);
      const updatedGenres = isSelected
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre];

      onSelectGenres(updatedGenres);
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
    return <div className="error">{t("error_loading_genres")}</div>;
  }

  const translations = genreTranslations[language] || genreTranslations.en;

  return (
    <>
      <div className="flex justify-center mt-9 overflow-hidden">
        <p
          className={`text-3xl select-none font-bold text-center mt-[9px] mx-4 mb-4 ${
            selectedGenres.length > 0
              ? "text-gray-900 dark:text-gray-300 underline" 
              : "text-gray-900 dark:text-gray-300 " 
          }`}
        >
          {t("genres")}
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.map((genre) => (
          <button
            key={genre.id}
            className={`m-2 px-1 py-2 text-md shadow-gray-300 dark:shadow-gray-950 shadow-md ${
              selectedGenres.find((g) => g.id === genre.id)
                ? "bg-blue-300 dark:bg-gray-600 dark:text-white"
                : ""
            } dark:text-gray-300 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-[102%] `}
            onClick={() => handleGenreClick(genre)}
          >
            {translations[genre.name] || genre.name}{" "}
          </button>
        ))}
      </div>

      <TMDBComply />
    </>
  );
};

export default GenreList;
