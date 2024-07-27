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

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [region, setRegion] = useState<Region>({
    iso_3166_1: "HU",
    english_name: "Hungary",
  });

  const filterData = useTvShows(genres, region, platform);
  const quickSearchData = useQuickSearch(searchQuery);

  const tvShowsData = isSearching ? quickSearchData : filterData;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleApply = () => {
    setIsSearching(false);
  };

  const handleRegionApply = () => {
    setPlatform(null);
    setIsSearching(false);
  };

  return (
    <DarkModeProvider>
      <div className="flex flex-col h-screen">
        <NavBar onSearch={handleSearch} />
        <div className="flex-grow flex overflow-auto">
          <aside className=" hidden sm:block w-52 p-4">
            <GenreList onApply={handleApply} onSelectGenres={setGenres} />
          </aside>
          <main className=" flex-grow p-4 ">
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
            <TvShowGrid
              selectedPlatform={platform}
              tvShowsData={tvShowsData}
              fetchNextPage={filterData.fetchNextPage}
              hasNextPage={filterData.hasNextPage}
              isFetchingNextPage={filterData.isFetchingNextPage}
            />
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
