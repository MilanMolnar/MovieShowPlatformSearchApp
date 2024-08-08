import { useState } from "react";
import "./App.css";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import TvShowGrid from "./components/TvShowGrid";
import { Genre } from "./hooks/useGenres";
import { DarkModeProvider } from "./providers/DarkmodeContextProvider";
import useTvShows from "./hooks/useTvShows";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import useQuickSearch from "./hooks/useQuickSearch";
import TvShowHeading from "./components/TvShowHeading";
import RegionSelector from "./components/RegionSelector";
import { Region } from "./hooks/useRegions";
import {
  SearchProvider,
  useSearch,
} from "./providers/SearchmodeContextProvider"; // Import SearchProvider and useSearch

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [region, setRegion] = useState<Region>({
    iso_3166_1: "HU",
    english_name: "Hungary",
  });

  const { searchQuery, isSearching, setIsSearching } = useSearch(); // Accessing search context

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
    <div className="flex flex-col h-screen">
      <NavBar />
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
    </div>
  );
}

// Wrap App component in both DarkModeProvider and SearchProvider
export default function WrappedApp() {
  return (
    <SearchProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </SearchProvider>
  );
}
