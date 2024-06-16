import { useState } from "react";
import useRegion from "../hooks/useRegion";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Spinner from "./Spinner";

interface Props {
  onSelectedRegion: (region: string) => void;
  selectedRegion: string | null;
  onApply: () => void;
}

const RegionSelector = ({
  onSelectedRegion,
  selectedRegion,
  onApply,
}: Props) => {
  const { data, error, loading } = useRegion();
  const [isOpen, setIsOpen] = useState(false);

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
          className="inline-flex justify-center w-24 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between w-full">
            <div className="">
              {selectedRegion ? selectedRegion : "Regions"}
            </div>
            {isOpen ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {["HU", "US", "GB", "CA", "AU", "NZ"].map((region) => (
              <a
                key={region}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onSelectedRegion(region);
                  //onApply();
                }}
              >
                {region}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
