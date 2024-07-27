import { useState } from "react";
import useRegions, { Region } from "../hooks/useRegions";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface Props {
  onSelectedRegion: (region: Region) => void;
  selectedRegion: Region | null;
  onApply: () => void;
}

const RegionSelector = ({
  onSelectedRegion,
  selectedRegion,
  onApply,
}: Props) => {
  const { data, error, isLoading } = useRegions();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <button
        type="button"
        className="inline-flex ml-4 justify-center w-56 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex  justify-between w-full">
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
        className="inline-flex ml-4 justify-center w-56 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex  justify-between w-full">
          <div className="">Error in region request.</div>
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
              {selectedRegion ? selectedRegion?.english_name : "Regions"}
            </div>
            {isOpen ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-[440px] overflow-auto z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {data?.map((region) => (
              <a
                key={region.iso_3166_1}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onSelectedRegion(region);
                  onApply();
                }}
              >
                {region.english_name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
