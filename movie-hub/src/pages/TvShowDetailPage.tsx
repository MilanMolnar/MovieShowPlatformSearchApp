import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProviders from "../hooks/useProviders";
import useTvShowDetails from "../hooks/useTvShowDetails";
import useSeasonDetails from "../hooks/useSeasonDetails";
import useRegions, { Region } from "../hooks/useRegions";
import TvShowDetailSkeleton from "../components/TvShowDetailSkeleton";
import ProvidersSkeleton from "../components/ProviderSkeleton";
import SeasonDetailSkeleton from "../components/TvShowSeasonDetailsSkeleton";
import RegionSelector from "../components/RegionSelector";
import SeasonSelector from "../components/SeasonSelector";
import { useRegion } from "../providers/RegionContextProvider";

const TvShowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [season, setSeason] = useState<number>(1);
  const { region, setRegion } = useRegion();

  // Fetch TV show details
  const { data: tvShowDetails, isLoading: isTvShowLoading } = useTvShowDetails(
    id!
  );

  // Fetch providers for the selected season and region
  const {
    data: providers,
    isLoading: isProvidersLoading,
    isError: isProvidersError,
  } = useProviders(Number(id), season, region.iso_3166_1);

  // Fetch available regions
  const {
    data: regions,
    isLoading: isRegionsLoading,
    isError: isRegionsError,
  } = useRegions();

  // Fetch specific season details
  const {
    data: seasonDetails,
    isLoading: isSeasonLoading,
    isError: isSeasonError,
  } = useSeasonDetails(Number(id), season);

  const handleRegionChange = (region: Region) => {
    setRegion(region);
  };

  const handleSeasonChange = (season: number) => {
    setSeason(season);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {isTvShowLoading ? (
        <TvShowDetailSkeleton />
      ) : (
        tvShowDetails && (
          <>
            {/* TV Show Banner */}
            <div
              className="relative h-96 mb-6 w-[330px] lg:w-[950px] md:w-[700px] sm:w-[500px] overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvShowDetails.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-300 dark:from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-600 dark:text-white truncate">
                  {tvShowDetails.name}
                </h1>
                <p className="text-base md:text-lg text-zinc-600 dark:text-gray-300 line-clamp-3">
                  {tvShowDetails.overview}
                </p>
              </div>
            </div>

            {/* TV Show Details */}
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Genres:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                First Air Date:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.first_air_date}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Last Air Date:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.last_air_date}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Status:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.status}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Vote Average:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.vote_average}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Number of Seasons:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.number_of_seasons}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Number of Episodes:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.number_of_episodes}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Original Language:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.original_language}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                Type:{" "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.type}
                </span>
              </p>
            </div>

            {/* Region and Season Selectors */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <RegionSelector
                selectedRegion={regions?.find((r) => r === region) || null}
                onSelectedRegion={(region) => handleRegionChange(region)}
                onApply={() => {}}
                className="w-full"
              />
              <SeasonSelector
                totalSeasons={tvShowDetails.number_of_seasons}
                selectedSeason={season}
                onSelectSeason={handleSeasonChange}
              />
            </div>

            {/* Watch Providers */}
            <div className="min-h-[200px]">
              {isProvidersLoading ? (
                <ProvidersSkeleton />
              ) : isProvidersError ? (
                <p className="text-center text-lg text-red-500">
                  Error loading providers.
                </p>
              ) : Array.isArray(providers) && providers.length > 0 ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold dark:text-white mb-4">
                    Watch Providers for Season {season} in {region.iso_3166_1}:
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {providers.map((provider) => (
                      <li
                        key={provider.provider_id}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="h-10"
                        />
                        <span className="dark:text-white">
                          {provider.provider_name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center text-lg">
                  No providers found for this season in this region.
                </p>
              )}
            </div>

            {/* Season Details */}
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-semibold dark:text-white mb-4">
                Season {season} Details:
              </h2>
              {isSeasonLoading ? (
                <SeasonDetailSkeleton />
              ) : isSeasonError ? (
                <p className="text-red-500">Error loading season details.</p>
              ) : seasonDetails ? (
                <div className="pb-10 pt-5">
                  <p className="text-sm md:text-base text-black dark:text-gray-400">
                    Overview:{" "}
                    <span className="dark:text-white text-zinc-700">
                      {seasonDetails.overview || "No overview provided"}
                    </span>
                  </p>
                  <p className="text-sm md:text-base text-black dark:text-gray-400">
                    Air Date:{" "}
                    <span className="dark:text-white text-zinc-700">
                      {seasonDetails.air_date}
                    </span>
                  </p>
                  <p className="text-sm md:text-base text-black dark:text-gray-400">
                    Number of Episodes:{" "}
                    <span className="dark:text-white text-zinc-700">
                      {seasonDetails.episodes.length || "No air date provided"}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {seasonDetails.episodes.map((episode) => (
                      <li
                        key={episode.id}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-16 h-16 flex-shrink-0">
                          {episode.still_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w154${episode.still_path}`}
                              alt={episode.name}
                              className="rounded"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-black dark:text-white">
                            {episode.episode_number}. {episode.name}
                          </h3>
                          <p className="text-sm md:text-base text-black dark:text-gray-400">
                            {episode.overview}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-lg text-center">
                  No season details available.
                </p>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default TvShowDetailPage;
