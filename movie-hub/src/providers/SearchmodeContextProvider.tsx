// src/providers/SearchmodeContextProvider.tsx

import React, { createContext, useContext, useState } from "react";

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  aiSearchQuery: string;
  setAISearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  isAISearching: boolean;
  setIsAISearching: (isAISearching: boolean) => void;
  handleSearch: (query: string) => void;
  handleAISearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiSearchQuery, setAISearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isAISearching, setIsAISearching] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setIsAISearching(false);
  };

  const handleAISearch = (query: string) => {
    setAISearchQuery(query);
    setIsAISearching(true);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        aiSearchQuery,
        setAISearchQuery,
        isSearching,
        setIsSearching,
        isAISearching,
        setIsAISearching,
        handleSearch,
        handleAISearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
