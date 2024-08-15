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
  const headingStyle =
    "text-3xl md:text-4xl font-bold ml-4 mt-10 mb-6 text-gray-900 dark:text-gray-300";
  if (isSearching) {
    return <h1 className={headingStyle}>Result for: "{searchQuery}"</h1>;
  }
  if (genres.length === 0 && !platform && !region) {
    return <h1 className={headingStyle}>Discover Shows</h1>;
  }
  if (genres.length === 0 && !platform) {
    return (
      <h1 className={headingStyle}>Discover Shows in {region.english_name}</h1>
    );
  }
  const genreNames = genres.map((genre) => genre.name).join(", ");
  if (!platform) {
    return (
      <h1 className={headingStyle}>
        {genreNames} Shows in {region.english_name}
      </h1>
    );
  }
  const heading = `${genreNames} ${platform?.provider_name} Shows in ${region.iso_3166_1}`;
  return <h1 className={headingStyle}>{heading}</h1>;
};

export default TvShowHeading;
