import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../providers/SearchmodeContextProvider";
import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineSavedSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

const AISearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [loadingState, setLoadingState] = useState<
    "idle" | "thinking" | "finding"
  >("idle");
  const [showTokenModal, setShowTokenModal] = useState(false);
  const { handleAISearch } = useSearch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isToken = () => {
    const token = localStorage.getItem("chatGPTToken");
    return !!token;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      setLoadingState("thinking");
      handleAISearch(aiQuery);
      setTimeout(() => {
        setLoadingState("finding");
      }, 2500);
    }
  };

  const handleRefresh = () => {
    setAiQuery("");
    setLoadingState("idle");
  };

  const handleButtonClick = () => {
    if (!isToken()) {
      // Open modal if no token is present
      setShowTokenModal(true);
    } else {
      setIsOpen((prev) => !prev);
      setLoadingState("idle");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {/*
        On mobile: when closed, unmount the form container (hidden)
        On desktop: keep the container mounted so transitions work.
      */}
      {isOpen && (
        <div
          className={`${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : !isOpen
              ? "hidden"
              : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          } bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4 w-72 transform transition-all duration-300 ease-in-out`}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder={t("Describe")}
              rows={3}
              disabled={loadingState !== "idle"}
            />
            <div className="flex items-center mt-2 space-x-2">
              <button
                type="submit"
                className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                disabled={loadingState !== "idle"}>
                {loadingState === "thinking"
                  ? t("Thinking")
                  : loadingState === "finding"
                  ? t("AIFindings")
                  : t("LetsSearch")}
              </button>
              {loadingState === "finding" && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none">
                  <FiRefreshCw />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 dark:bg-blue-600 shadow-xl shadow-black text-white h-10 w-24 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
        <MdOutlineSavedSearch size={20} className="mr-1" />
        {t("AIFind")}
      </button>

      {/* Modal for missing token */}
      <Modal isOpen={showTokenModal} onClose={() => setShowTokenModal(false)}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          ChatGPT Token Required
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You need to have a ChatGPT token linked to your profile in order to
          use the AI search functionality.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowTokenModal(false)}
            className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none">
            Not Interested
          </button>
          <button
            onClick={() => {
              setShowTokenModal(false);
              navigate("/profile");
            }}
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
            Ok, take me to profile
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AISearchButton;
