import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearch } from "../providers/SearchmodeContextProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const { handleSearch, setIsSearching } = useSearch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (inputValue !== "") {
      handleSearch(inputValue);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [inputValue, handleSearch, setIsSearching]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    setIsSearching(false);
  };

  const handleSearchSubmit = () => {
    if (inputValue) {
      handleSearch(inputValue);
      navigate("/");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex xl:w-[700px] lg:w-[500px] md:w-[380px] min-w-[175px] md:ml-2  bg-gray-100 dark:bg-gray-800 rounded-md">
      <input
        className="w-full px-4 py-1 text-gray-700 dark:text-gray-300 rounded-l-md bg-gray-300 dark:bg-gray-800 focus:outline-none focus:bg-white dark:focus:bg-gray-700"
        type="text"
        placeholder={t("search_placeholder")}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleClear}
        className="px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
        <FaTimes />
      </button>
      <button
        onClick={handleSearchSubmit}
        className="px-4 font-bold text-white bg-blue-500 rounded-r-md hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-500">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBox;
