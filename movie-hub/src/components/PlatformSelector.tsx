import { useState } from "react";
import usePlatforms, { Platform } from "../hooks/usePlatforms";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
  onApply: () => void;
  watch_region: string;
}

const PlatformSelector = ({
  onSelectPlatform,
  selectedPlatform,
  onApply,
  watch_region,
}: Props) => {
  const { data, error, isLoading } = usePlatforms(watch_region || "HU");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const nullDataInHU = [
    "Apple TV",
    "Google Play Movies",
    "MUBI",
    "Dekkoo",
    "DOCSVILLE",
    "WOW Presents Plus",
    "BroadwayHD",
    "Cultpix",
    "FilmBox+",
    "Max Amazon Channel",
    "HBO Max",
    "Sun Nxt",
    "Hayu",
    "Magellan TV",
    "Hoichoi",
  ];

  const filteredData =
    watch_region === null || watch_region === undefined || watch_region === "HU"
      ? data?.filter(
          (platform) => !nullDataInHU.includes(platform.provider_name)
        )
      : data;

  // Filter platforms based on search query
  const displayedPlatforms = filteredData?.filter((platform) =>
    platform.provider_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shouldShowSearchBar = filteredData && filteredData.length > 13;

  if (isLoading) {
    return (
      <button
        type="button"
        className="inline-flex ml-4 justify-center w-60 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between w-full">
          <div className="">Loading...</div>
          <FaCaretDown size={20} />
        </div>
      </button>
    );
  }

  if (error) {
    return (
      <button
        type="button"
        className="inline-flex ml-4 justify-center w-60 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 "
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between w-full">
          <div className="">Error in platform request.</div>
          <FaCaretDown size={20} />
        </div>
      </button>
    );
  }

  return (
    <div className="relative inline-block text-left ml-4">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-60 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between w-full">
            <div className="">
              {selectedPlatform ? selectedPlatform.provider_name : "Providers"}
            </div>
            {isOpen ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-[440px] overflow-auto custom-scrollbar z-50">
          {/* Conditionally show the search bar */}
          {shouldShowSearchBar && (
            <div className="p-2">
              <input
                type="text"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {displayedPlatforms?.map((platform) => (
              <a
                key={platform.provider_id}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onSelectPlatform(platform);
                  onApply();
                }}
              >
                {platform.provider_name}
              </a>
            ))}
            {displayedPlatforms?.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No platforms found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;
