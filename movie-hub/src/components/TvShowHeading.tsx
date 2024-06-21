import React from "react";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/usePlatforms";

interface Props {
  genres: Genre[];
  platform: Platform | null;
  searchQuery: string;
  isSearching: boolean;
}

const TvShowHeading = ({
  genres,
  platform,
  searchQuery,
  isSearching,
}: Props) => {
  if (isSearching) {
    return <h1 className="text-3xl ml-4 my-2">Result for: "{searchQuery}"</h1>;
  }
  if (genres.length === 0 && !platform) {
    return <h1 className="text-3xl ml-4 my-2">Discover Shows</h1>;
  }
  const genreNames = genres.map((genre) => genre.name).join(", ");
  if (!platform) {
    return <h1 className="text-3xl ml-4 my-2">{genreNames} Shows</h1>;
  }
  const heading = `${genreNames} ${platform?.provider_name} Shows`;
  return <h1 className="text-3xl ml-4 my-2">{heading}</h1>;
};

export default TvShowHeading;
