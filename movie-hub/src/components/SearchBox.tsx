import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "../providers/SearchmodeContextProvider";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const { handleSearch } = useSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex w-96 bg-gray-100 dark:bg-gray-800 rounded-md">
      <input
        className="w-full px-4 py-1 text-gray-700 dark:text-gray-300 rounded-l-md bg-gray-300 dark:bg-gray-800 focus:outline-none focus:bg-white dark:focus:bg-gray-700"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        onClick={() => {
          if (inputValue) {
            handleSearch(inputValue);
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
