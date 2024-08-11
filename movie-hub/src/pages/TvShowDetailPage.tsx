import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProviders from "../hooks/useProviders";
import useTvShowDetails from "../hooks/useTvShowDetails";
import useRegions from "../hooks/useRegions";
import TvShowDetailSkeleton from "../components/TvShowDetailSkeleton";
import ProvidersSkeleton from "../components/ProviderSkeleton";

const TvShowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [season, setSeason] = useState<number>(1);
  const [region, setRegion] = useState<string>("HU");

  // Fetch TV show details
  const { data: tvShowDetails, isLoading: isTvShowLoading } = useTvShowDetails(
    id!
  );

  // Fetch providers for the selected season and region
  const {
    data: providers,
    isLoading: isProvidersLoading,
    isError: isProvidersError,
  } = useProviders(Number(id), season, region);

  // Fetch available regions
  const {
    data: regions,
    isLoading: isRegionsLoading,
    isError: isRegionsError,
  } = useRegions();

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(Number(event.target.value));
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {isTvShowLoading ? (
        <TvShowDetailSkeleton />
      ) : (
        tvShowDetails && (
          <>
            <div
              className="relative h-96 mb-6 w-[330px] lg:w-[950px] md:w-[700px] sm:w-[500px] overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvShowDetails.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white truncate">
                  {tvShowDetails.name}
                </h1>
                <p className="text-base md:text-lg text-gray-300 line-clamp-3">
                  {tvShowDetails.overview}
                </p>
              </div>
            </div>

            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <p className="text-sm md:text-base text-gray-400">
                Genres:{" "}
                <span className="text-white">
                  {tvShowDetails.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
              <p className="text-sm md:text-base text-gray-400">
                First Air Date:{" "}
                <span className="text-white">
                  {tvShowDetails.first_air_date}
                </span>
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Status:{" "}
                <span className="text-white">{tvShowDetails.status}</span>
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Vote Average:{" "}
                <span className="text-white">{tvShowDetails.vote_average}</span>
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Number of Seasons:{" "}
                <span className="text-white">
                  {tvShowDetails.number_of_seasons}
                </span>
              </p>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <label className="block text-gray-300">
                Region:
                {isRegionsLoading ? (
                  <div className="h-10 bg-gray-600 rounded w-full animate-pulse"></div>
                ) : !isRegionsError && regions ? (
                  <select
                    value={region}
                    onChange={handleRegionChange}
                    className="block w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-gray-500"
                  >
                    {regions.map((region) => (
                      <option key={region.iso_3166_1} value={region.iso_3166_1}>
                        {region.english_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  isRegionsError && (
                    <p className="text-red-500">Failed to load regions</p>
                  )
                )}
              </label>

              <label className="block text-gray-300">
                Season:
                <select
                  value={season}
                  onChange={handleSeasonChange}
                  className="block w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-gray-500"
                >
                  {Array.from(
                    { length: tvShowDetails.number_of_seasons },
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Season {i + 1}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>
          </>
        )
      )}

      <div className="min-h-[200px]">
        {isProvidersLoading ? (
          <ProvidersSkeleton />
        ) : isProvidersError ? (
          <p className="text-center text-lg text-red-500">
            Error loading providers.
          </p>
        ) : Array.isArray(providers) && providers.length > 0 ? (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Watch Providers for Season {season} in {region}:
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
                  <span className="text-white">{provider.provider_name}</span>
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
    </div>
  );
};

export default TvShowDetailPage;
