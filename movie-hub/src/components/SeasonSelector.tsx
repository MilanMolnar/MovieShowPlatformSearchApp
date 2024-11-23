import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface SeasonSelectorProps {
  totalSeasons: number;
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  totalSeasons,
  selectedSeason,
  onSelectSeason,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSeasonSelect = (season: number) => {
    onSelectSeason(season);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
        onClick={toggleDropdown}
      >
        Season {selectedSeason}
        {isOpen ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
      </button>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-[440px] overflow-auto custom-scrollbar z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="py-1">
          {[...Array(totalSeasons)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleSeasonSelect(i + 1)}
              className={`block w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${
                selectedSeason === i + 1
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Season {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonSelector;
