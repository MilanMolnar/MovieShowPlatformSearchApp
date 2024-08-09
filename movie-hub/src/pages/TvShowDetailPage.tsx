import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProviders from "../hooks/useProviders"; // Make sure to import your hook

const TvShowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [season, setSeason] = useState<number>(1);
  const [region, setRegion] = useState<string>("HU");

  const {
    data: providers,
    isLoading,
    isError,
  } = useProviders(Number(id), season, region);

  const handleSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeason(Number(event.target.value));
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  return (
    <div>
      <h1>TV Show Details for ID: {id}</h1>

      <div>
        <label>
          Region:
          <input
            type="text"
            value={region}
            onChange={handleRegionChange}
            placeholder="Enter region"
          />
        </label>
      </div>

      <div>
        <label>
          Season:
          <input
            type="number"
            value={season}
            onChange={handleSeasonChange}
            min="1"
          />
        </label>
      </div>

      {isLoading && <p>Loading providers...</p>}
      {isError && <p>Error loading providers.</p>}
      {!isLoading &&
        !isError &&
        Array.isArray(providers) &&
        providers.length > 0 && (
          <div>
            <h2>
              Watch Providers for Season {season} in {region}:
            </h2>
            <ul>
              {providers.map((provider) => (
                <li key={provider.provider_id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                  {provider.provider_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      {!isLoading &&
        !isError &&
        (!Array.isArray(providers) || providers.length === 0) && (
          <p>No providers found for this season in this region.</p>
        )}
    </div>
  );
};

export default TvShowDetailPage;
