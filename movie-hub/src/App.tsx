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

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const filterData = useTvShows(genres, platform);
  const quickSearchData = useQuickSearch(searchQuery);

  const tvShowsData = isSearching ? quickSearchData : filterData;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleApply = () => {
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
            />
            <div>
              <PlatformSelector
                onApply={handleApply}
                selectedPlatform={platform}
                onSelectPlatform={setPlatform}
              />
              <RegionSelector
                onApply={() => console.log("Apply")}
                selectedRegion={"HU"}
                onSelectedRegion={() => console.log("Selected Region")}
              />
            </div>
            <TvShowGrid selectedPlatform={platform} tvShowsData={tvShowsData} />
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
