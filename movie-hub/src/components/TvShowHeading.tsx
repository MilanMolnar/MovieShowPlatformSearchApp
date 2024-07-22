import React from "react";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/usePlatforms";
import { Region } from "../hooks/useRegions";

interface Props {
  genres: Genre[];
  platform: Platform | null;
  searchQuery: string;
  isSearching: boolean;
  region: Region;
}

const TvShowHeading = ({
  genres,
  platform,
  searchQuery,
  isSearching,
  region,
}: Props) => {
  if (isSearching) {
    return <h1 className="text-3xl ml-4 my-2">Result for: "{searchQuery}"</h1>;
  }
  if (genres.length === 0 && !platform && !region) {
    return <h1 className="text-3xl ml-4 my-2">Discover Shows</h1>;
  }
  if (genres.length === 0 && !platform) {
    return (
      <h1 className="text-3xl ml-4 my-2">
        Discover Shows in {region.english_name}
      </h1>
    );
  }
  const genreNames = genres.map((genre) => genre.name).join(", ");
  if (!platform) {
    return (
      <h1 className="text-3xl ml-4 my-2">
        {genreNames} Shows in {region.english_name}
      </h1>
    );
  }
  const heading = `${genreNames} ${platform?.provider_name} Shows in ${region.iso_3166_1}`;
  return <h1 className="text-3xl ml-4 my-2">{heading}</h1>;
};

export default TvShowHeading;
