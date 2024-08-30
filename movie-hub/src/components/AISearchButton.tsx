// src/components/AISearchButton.tsx

import React, { useState } from "react";
import { useSearch } from "../providers/SearchmodeContextProvider";

const AISearchButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const { handleAISearch } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAISearch(aiQuery);
    setIsOpen(false);
    setAiQuery("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="w-full text-black p-2 border rounded"
              placeholder="Describe the show you are looking for."
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              AI Search
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 focus:outline-none"
      >
        AI
      </button>
    </div>
  );
};

export default AISearchButton;
