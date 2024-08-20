import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const headingStyle =
    "text-3xl md:text-4xl select-none font-bold ml-4 mt-10 mb-6 text-gray-900 dark:text-gray-300";

  if (isSearching) {
    return <h1 className={headingStyle}>{t("result_for", { searchQuery })}</h1>;
  }
  if (genres.length === 0 && !platform && !region) {
    return <h1 className={headingStyle}>{t("discover_shows")}</h1>;
  }
  if (genres.length === 0 && !platform) {
    return (
      <h1 className={headingStyle}>
        {t("discover_shows_in_region", { regionName: region.native_name })}
      </h1>
    );
  }
  const genreNames = genres.map((genre) => genre.name).join(", ");
  if (!platform) {
    return (
      <h1 className={headingStyle}>
        {t("genre_platform_shows_in_region", {
          genreNames,
          platformName: "",
          regionCode: region.native_name,
        })}
      </h1>
    );
  }
  const heading = t("genre_platform_shows_in_region", {
    genreNames,
    platformName: platform.provider_name,
    regionCode: region.native_name,
  });
  return <h1 className={headingStyle}>{heading}</h1>;
};

export default TvShowHeading;
