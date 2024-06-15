import useGenres, { Genre } from "../hooks/useGenres";
import Spinner from "./Spinner";

const GenreList = () => {
  const { data, error, loading } = useGenres();
  console.log(data);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-center m-4 underline dark:text-gray-300 ">
        Genres
      </h2>
      <div className="flex flex-wrap justify-center ">
        {data.map((genre) => (
          <div
            key={genre.id}
            className="m-2 p-2 shadow-gray-300 dark:shadow-black shadow-md dark:bg-gray-900 bg-gray-100 dark:text-gray-300 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            {genre.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default GenreList;
