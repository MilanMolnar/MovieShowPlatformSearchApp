import { useState } from "react";
import usePlatforms, { Platform } from "../hooks/usePlatforms";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Spinner from "./Spinner";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector = ({ onSelectPlatform }: Props) => {
  const { data, error, loading } = usePlatforms();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Providers");
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
  ];
  const priorityHU = data.filter(
    (platform) => platform.display_priorities["HU"] > 0
  );
  const filteredData = priorityHU.filter(
    (platform) => !nullDataInHU.includes(platform.provider_name)
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return null;
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
            <div className="">{selected}</div>
            {isOpen ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {filteredData.map((platform) => (
              <a
                key={platform.provider_id}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900"
                role="menuitem"
                onClick={() => {
                  setSelected(platform.provider_name);
                  setIsOpen(false);
                  onSelectPlatform(platform);
                }}
              >
                {platform.provider_name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;
