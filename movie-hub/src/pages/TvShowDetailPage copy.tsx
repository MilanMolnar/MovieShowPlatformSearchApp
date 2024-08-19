import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProviders from "../hooks/useProviders";
import useTvShowDetails from "../hooks/useTvShowDetails";
import useSeasonDetails from "../hooks/useSeasonDetails";
import useRegions, { Region } from "../hooks/useRegions";
import useTvShowCredits from "../hooks/useTvShowCredits"; // New Hook
import TvShowDetailSkeleton from "../components/TvShowDetailSkeleton";
import ProvidersSkeleton from "../components/ProviderSkeleton";
import SeasonDetailSkeleton from "../components/TvShowSeasonDetailsSkeleton";
import RegionSelector from "../components/RegionSelector";
import SeasonSelector from "../components/SeasonSelector";
import { useRegion } from "../providers/RegionContextProvider";
import EpisodeDetails from "../components/EpisodeDetails";
import { motion, AnimatePresence } from "framer-motion";

const TvShowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [season, setSeason] = useState<number>(1);
  const { region, setRegion } = useRegion();
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);
  const [hoveredEpisode, setHoveredEpisode] = useState<number | null>(null);

  const toggleEpisode = (episodeNumber: number) => {
    setExpandedEpisode(
      expandedEpisode === episodeNumber ? null : episodeNumber
    );
  };

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

  // Fetch credits (cast)
  const { data: tvShowCredits, isLoading: isCreditsLoading } = useTvShowCredits(
    id!
  );

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

              {/* Starring Section */}
              {isCreditsLoading ? (
                <p>Loading cast...</p>
              ) : tvShowCredits && tvShowCredits.cast.length > 0 ? (
                <p className="text-sm md:text-base text-black dark:text-gray-400">
                  Starring:{" "}
                  <span className="dark:text-white text-zinc-700">
                    {tvShowCredits.cast
                      .slice(0, 5)
                      .map((castMember) => castMember.name)
                      .join(", ")}
                  </span>
                </p>
              ) : (
                <p>No cast information available.</p>
              )}
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
            <div className="min-h-[100px] mb-5">
              {isProvidersLoading ? (
                <ProvidersSkeleton />
              ) : isProvidersError ? (
                <div className="text-red-500">
                  Sorry, there was an issue loading the providers.
                </div>
              ) : providers?.length ? (
                <ul className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {providers.map((provider) => (
                    <li key={provider.provider_id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="rounded-lg shadow-lg"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No providers available for this show in your region.</p>
              )}
            </div>

            {/* Season Details */}
            <div className="p-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg">
              {isSeasonLoading ? (
                <SeasonDetailSkeleton />
              ) : isSeasonError ? (
                <div className="text-red-500">
                  Sorry, there was an issue loading the season details.
                </div>
              ) : seasonDetails ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
                    Season {seasonDetails.season_number}: {seasonDetails.name}
                  </h2>
                  <p className="text-sm md:text-base text-black dark:text-gray-400 mb-4">
                    {seasonDetails.overview}
                  </p>
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {seasonDetails.episodes.map((episode) => (
                      <motion.div
                        key={episode.id}
                        className="p-4 rounded-lg shadow-lg bg-gray-200 dark:bg-gray-700 cursor-pointer relative overflow-hidden"
                        onClick={() => toggleEpisode(episode.episode_number)}
                        onMouseEnter={() =>
                          setHoveredEpisode(episode.episode_number)
                        }
                        onMouseLeave={() => setHoveredEpisode(null)}
                      >
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1">
                            <img
                              src={`https://image.tmdb.org/t/p/w185${episode.still_path}`}
                              alt={episode.name}
                              className="rounded-lg"
                            />
                          </div>
                          <div className="col-span-3">
                            <h3 className="text-md md:text-lg font-semibold mb-2 dark:text-white">
                              {episode.episode_number}. {episode.name}
                            </h3>
                            <p className="text-xs md:text-sm text-black dark:text-gray-400 line-clamp-3">
                              {episode.overview}
                            </p>
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedEpisode === episode.episode_number && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4"
                            >
                              <EpisodeDetails
                                seriesId={Number(id)}
                                seasonNumber={season}
                                episodeNumber={episode.episode_number}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {hoveredEpisode === episode.episode_number && (
                          <motion.div
                            layoutId="underline"
                            className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-900 dark:bg-gray-300"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>No season details available.</div>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default TvShowDetailPage;
