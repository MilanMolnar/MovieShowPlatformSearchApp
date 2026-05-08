import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal"; // adjust the path if needed
import { useSearch } from "../providers/SearchmodeContextProvider";

const ChatGPTTokenInput: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { aiDemoMode, setAiDemoMode } = useSearch();

  useEffect(() => {
    const storedToken = localStorage.getItem("chatGPTToken");
    if (storedToken) {
      setSavedToken(storedToken);
    }
  }, []);

  const handleSaveToken = () => {
    if (token.trim()) {
      localStorage.setItem("chatGPTToken", token);
      setSavedToken(token);
      setToken("");
    }
  };

  const handleClearToken = () => {
    localStorage.removeItem("chatGPTToken");
    setSavedToken(null);
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-4 py-3 pb-4 sm:max-w-sm md:max-w-lg lg:max-w-xl w-full transform transition-transform">
        <div className="flex items-center justify-center mb-3">
          <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            {savedToken ? "Token Saved" : "Enter ChatGPT Token"}
          </h2>
          {/* Info icon */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="ml-2 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
            title="More info">
            i
          </button>
        </div>
        <div className="text-center">
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Paste your token here"
              value={
                token || savedToken
                  ? "************************************"
                  : token
              }
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-gray-100 px-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              disabled={savedToken !== null}
            />
            {!savedToken ? (
              <button
                onClick={handleSaveToken}
                className="bg-blue-500 dark:bg-blue-600 px-2 w-20 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
                {t("save")}
              </button>
            ) : (
              <button
                onClick={handleClearToken}
                className="bg-red-500 dark:bg-red-600 px-2 w-12 text-white rounded-md transition duration-300 ease-in-out hover:bg-red-600 dark:hover:bg-red-500 focus:outline-none">
                X
              </button>
            )}
          </div>
        </div>
        {/* Demo mode toggle */}
        <div className="flex items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <input
            id="aiDemoMode"
            type="checkbox"
            checked={aiDemoMode}
            onChange={(e) => setAiDemoMode(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="aiDemoMode"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            AI Demo Mode{" "}
            <span className="text-gray-400 dark:text-gray-500 text-xs">
              (no token required — uses quick search)
            </span>
          </label>
        </div>
      </div>

      {/* Reusable Modal for token info */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          ChatGPT API Token Information
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In order to use the AI searching capabilities, you need to enter a
          valid and charged ChatGPT API token.
          <br />
          The operator of this site does not provide one.
          <br />
          Your token is stored only in your own browser! There is no backend
          server where the webapp owner or any of its affiliates store or can
          read your token.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatGPTTokenInput;
