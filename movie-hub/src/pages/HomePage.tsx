import { useState, useEffect } from "react";
import GenreList from "../components/GenreList";
import TvShowGrid from "../components/TvShowGrid";
import PlatformSelector from "../components/PlatformSelector";
import TvShowHeading from "../components/TvShowHeading";
import RegionSelector from "../components/RegionSelector";
import { useSearch } from "../providers/SearchmodeContextProvider";
import useTvShows from "../hooks/useTvShows";
import useQuickSearch from "../hooks/useQuickSearch";
import useAISearch from "../hooks/useAiSearch";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/usePlatforms";
import CookieConsent from "../components/CookieConsent";
import AISearchButton from "../components/AISearchButton";
import "../App.css";
import { useRegion } from "../providers/RegionContextProvider";
import { Region } from "../hooks/useRegions";

const HomePage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const { region, setRegion } = useRegion();
  const [cookieConsent, setCookieConsent] = useState(false);

  const {
    searchQuery,
    aiSearchQuery,
    isSearching,
    isAISearching,
    setIsSearching,
    setIsAISearching,
  } = useSearch();

  useEffect(() => {
    // Set default platform, region, and genres on component mount
    setDefaultPlatform();
    setDefaultRegion();
    setDefaultGenres();
    return () => {};
  }, []);

  const setDefaultRegion = () => {
    const selectedRegion = localStorage.getItem("selectedRegion");
    if (selectedRegion) {
      const parsedRegion = JSON.parse(selectedRegion);
      setRegion(parsedRegion);
    }
  };

  const setDefaultPlatform = () => {
    const selectedPlatform = localStorage.getItem("selectedPlatform");
    if (selectedPlatform) {
      const parsedPlatform = JSON.parse(selectedPlatform);
      setPlatform(parsedPlatform);
    }
  };

  const setDefaultGenres = () => {
    const selectedGenres = localStorage.getItem("selectedGenres");
    if (selectedGenres) {
      const parsedGenres = JSON.parse(selectedGenres);
      setGenres(parsedGenres);
    }
  };

  const filterData = useTvShows(genres, region, platform);
  const quickSearchData = useQuickSearch(searchQuery);
  const aiSearchData = useAISearch(aiSearchQuery);

  const tvShowsData = isSearching
    ? quickSearchData
    : isAISearching
      ? aiSearchData
      : filterData;

  const handleApply = () => {
    setIsSearching(false);
    setIsAISearching(false);
  };

  const handleRegionApply = () => {
    clearPlatform();

    setIsSearching(false);
    setIsAISearching(false);
  };

  const clearPlatform = () => {
    setPlatform(null);
    localStorage.removeItem("selectedPlatform");
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setCookieConsent(true);
    }
  }, []);

  const handleCookieConsent = () => {
    setCookieConsent(true);
    localStorage.setItem("cookieConsent", "true");
  };

  const handleSetPlaform = (selectedPlatform: Platform | null) => {
    setPlatform(selectedPlatform);
    const _selectedPlatform = localStorage.getItem("selectedPlatform");
    const isSamePlatform = _selectedPlatform
      ? JSON.parse(_selectedPlatform).provider_id ===
        selectedPlatform?.provider_id
      : false;

    if (!_selectedPlatform || !isSamePlatform) {
      localStorage.setItem(
        "selectedPlatform",
        JSON.stringify(selectedPlatform),
      );
    }
  };

  const handleSetRegion = (selectedRegion: Region) => {
    setRegion(selectedRegion);
    const _selectedRegion = localStorage.getItem("selectedRegion");
    const isSameRegion = _selectedRegion
      ? JSON.parse(_selectedRegion).iso_3166_1 === selectedRegion.iso_3166_1
      : false;

    if (!_selectedRegion || !isSameRegion) {
      localStorage.setItem("selectedRegion", JSON.stringify(selectedRegion));
    }
  };

  const handleSetGenres = (selectedGenres: Genre[]) => {
    setGenres(selectedGenres);
    const _selectedGenres = localStorage.getItem("selectedGenres");
    const isSameGenres = _selectedGenres
      ? JSON.parse(_selectedGenres) === selectedGenres
      : false;

    if (!_selectedGenres || !isSameGenres) {
      localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
    }
  };

  return (
    <div className="flex-grow flex flex-col no-scrollbar">
      <div className="flex-grow flex overflow-auto">
        <aside className="hidden sm:block w-52 p-4">
          <GenreList selectedGenres={genres} onSelectGenres={handleSetGenres} />
        </aside>
        <main className="flex-grow p-4 overflow-auto no-scrollbar">
          <TvShowHeading
            searchQuery={isAISearching ? aiSearchQuery : searchQuery}
            isSearching={isSearching}
            isAISearching={isAISearching}
            platform={platform}
            genres={genres}
            region={region}
          />
          <div>
            <PlatformSelector
              watch_region={region.iso_3166_1}
              onApply={handleApply}
              selectedPlatform={platform}
              onSelectPlatform={handleSetPlaform}
            />
            <RegionSelector
              className="ml-4 md:ml-0 w-60"
              onApply={handleRegionApply}
              selectedRegion={region}
              onSelectedRegion={handleSetRegion}
            />
          </div>
          <TvShowGrid selectedPlatform={platform} tvShowsData={tvShowsData} />
        </main>
      </div>
      {!cookieConsent && <CookieConsent onAccept={handleCookieConsent} />}
      <AISearchButton />
    </div>
  );
};

export default HomePage;
