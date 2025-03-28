import { useState } from "react";
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
import EpisodeDetails from "../components/EpisodeDetails";
import { motion, AnimatePresence } from "framer-motion";
import useTvShowCredits from "../hooks/useTvShowCredits";
import { useTranslation } from "react-i18next";

const TvShowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [season, setSeason] = useState<number>(1);
  const { region, setRegion } = useRegion();
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);
  const [hoveredEpisode, setHoveredEpisode] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleEpisode = (episodeNumber: number) => {
    setExpandedEpisode(
      expandedEpisode === episodeNumber ? null : episodeNumber
    );
  };

  const { data: tvShowDetails, isLoading: isTvShowLoading } = useTvShowDetails(
    id!
  );

  const {
    data: providers,
    isLoading: isProvidersLoading,
    isError: isProvidersError,
  } = useProviders(Number(id), season, region.iso_3166_1);

  const {
    data: regions,
    isLoading: isRegionsLoading,
    isError: isRegionsError,
  } = useRegions();

  const { data: tvShowCredits, isLoading: isCreditsLoading } = useTvShowCredits(
    id!
  );

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
              className="relative h-96 mb-6 w-full  lg:w-[950px] overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvShowDetails.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-300 dark:from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-600 dark:text-white">
                  {tvShowDetails.name}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-gray-300 line-clamp-3">
                  {tvShowDetails.overview}
                </p>
              </div>
            </div>

            {/* TV Show Details */}
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.genres") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.firstAirDate") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.first_air_date}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.lastAirDate") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.last_air_date}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.status") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.status}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.voteAverage") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.vote_average}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.numberOfSeasons") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.number_of_seasons}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.numberOfEpisodes") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.number_of_episodes}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.originalLanguage") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.original_language}
                </span>
              </p>
              <p className="text-sm md:text-base text-black dark:text-gray-400">
                {t("tvShowDetails.type") + ": "}
                <span className="dark:text-white text-zinc-700">
                  {tvShowDetails.type}
                </span>
              </p>
              {/* Starring Section */}
              {isCreditsLoading ? (
                <p>{t("loading.loadingCast")}</p>
              ) : tvShowCredits && tvShowCredits.cast.length > 0 ? (
                <p className="text-sm md:text-base text-black dark:text-gray-400">
                  {t("tvShowDetails.starring") + ": "}
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
                <p className="text-center text-lg text-red-500">
                  {t("regionAndSeasonSelectors.errorLoadingProviders")}
                </p>
              ) : Array.isArray(providers) && providers.length > 0 ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold dark:text-white mb-4">
                    {t("regionAndSeasonSelectors.watchProviders", {
                      season: season,
                      region: region.native_name,
                    })}
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {providers.map((provider) => (
                      <li
                        key={provider.provider_id}
                        className="flex items-center space-x-2">
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
              <h2 className="text-xl md:text-2xl font-semibold dark:text-white">
                {t("seasonDetails.seasonDetails", { season: season })}
              </h2>
              {isSeasonLoading ? (
                <SeasonDetailSkeleton />
              ) : isSeasonError ? (
                <p className="text-red-500">Error loading season details.</p>
              ) : seasonDetails ? (
                <div className="pb-10 pt-5">
                  <p className="text-sm md:text-base text-black dark:text-gray-400">
                    {t("seasonDetails.overview")}
                    {": "}
                    <span className="dark:text-white text-zinc-700">
                      {seasonDetails.overview || t("noOverview")}
                    </span>
                  </p>
                  <p className="text-sm md:text-base text-black dark:text-gray-400">
                    {t("seasonDetails.airDate")}
                    {": "}
                    <span className="dark:text-white text-zinc-700">
                      {seasonDetails.air_date}
                    </span>
                  </p>
                  <p className="text-sm md:text-base text-black dark:text-gray-400">
                    {t("seasonDetails.numberOfEpisodes")}
                    {": "}
                    <span className="dark:text-white text-zinc-700">
                      {seasonDetails.episodes.length || "No air date provided"}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {seasonDetails.episodes.map((episode) => (
                      <li
                        key={episode.id}
                        className="flex flex-col space-y-2 pt-5">
                        <div
                          className="flex items-start space-x-2 cursor-pointer"
                          onClick={() => toggleEpisode(episode.episode_number)}>
                          <div
                            className="w-20 h-20 flex-shrink-0 relative"
                            onMouseEnter={() =>
                              setHoveredEpisode(episode.episode_number)
                            }
                            onMouseLeave={() => setHoveredEpisode(null)}>
                            {episode.still_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w154${episode.still_path}`}
                                alt={episode.name}
                                className={`rounded 
                            ${
                              hoveredEpisode === episode.episode_number
                                ? "outline outline-2 outline-blue-400 dark:outline-gray-500 "
                                : ""
                            }
                            ${
                              expandedEpisode === episode.episode_number
                                ? "outline outline-2 outline-blue-700 dark:outline-white"
                                : ""
                            }
                          `}
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
                        </div>
                        <AnimatePresence>
                          {expandedEpisode === episode.episode_number && (
                            <EpisodeDetails
                              seriesId={Number(id)}
                              seasonNumber={season}
                              episodeNumber={episode.episode_number}
                            />
                          )}
                        </AnimatePresence>
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
