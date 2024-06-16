import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  onSearch: (searchQuery: string) => void;
}

const SearchBox = ({ onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex w-96 bg-gray-100 dark:bg-gray-800 rounded-md">
      <input
        className="w-full px-4 py-1 text-gray-700 dark:text-gray-300 rounded-l-md bg-gray-300 dark:bg-gray-800 focus:outline-none focus:bg-white dark:focus:bg-gray-700"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        onClick={() => {
          if (searchQuery) {
            onSearch(searchQuery);
          } else {
            onSearch("");
          }
        }}
        className=" px-4 font-bold text-white bg-blue-500 rounded-r-md hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBox;
