import React, { useState } from "react";
import GenreList from "../components/GenreList";
import TvShowGrid from "../components/TvShowGrid";
import PlatformSelector from "../components/PlatformSelector";
import TvShowHeading from "../components/TvShowHeading";
import RegionSelector from "../components/RegionSelector";
import { useSearch } from "../providers/SearchmodeContextProvider";
import useTvShows from "../hooks/useTvShows";
import useQuickSearch from "../hooks/useQuickSearch";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/usePlatforms";
import { Region } from "../hooks/useRegions";
import "../App.css";

const HomePage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [region, setRegion] = useState<Region>({
    iso_3166_1: "HU",
    english_name: "Hungary",
  });

  const { searchQuery, isSearching, setIsSearching } = useSearch();

  const filterData = useTvShows(genres, region, platform);
  const quickSearchData = useQuickSearch(searchQuery);

  const tvShowsData = isSearching ? quickSearchData : filterData;

  const handleApply = () => {
    setIsSearching(false);
  };

  const handleRegionApply = () => {
    setPlatform(null);
    setIsSearching(false);
  };

  return (
    <div className="flex-grow flex overflow-auto">
      <aside className="hidden sm:block w-52 p-4">
        <GenreList onApply={handleApply} onSelectGenres={setGenres} />
      </aside>
      <main className="flex-grow p-4 overflow-auto">
        <TvShowHeading
          searchQuery={searchQuery}
          isSearching={isSearching}
          platform={platform}
          genres={genres}
          region={region}
        />
        <div>
          <PlatformSelector
            watch_region={region.iso_3166_1}
            onApply={handleApply}
            selectedPlatform={platform}
            onSelectPlatform={setPlatform}
          />

          <RegionSelector
            onApply={handleRegionApply}
            selectedRegion={region}
            onSelectedRegion={setRegion}
          />
        </div>
        <TvShowGrid selectedPlatform={platform} tvShowsData={tvShowsData} />
      </main>
    </div>
  );
};

export default HomePage;
