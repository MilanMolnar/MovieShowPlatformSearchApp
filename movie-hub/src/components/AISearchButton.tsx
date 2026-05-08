import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../providers/SearchmodeContextProvider";
import { FiRotateCcw } from "react-icons/fi";
import { MdOutlineSavedSearch, MdClose, MdSend } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

interface ChatEntry {
  id: string;
  userMessage: string;
  combinedQuery: string;
  status: "thinking" | "finding" | "done";
}

const AISearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const { handleAISearch, aiDemoMode } = useSearch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isToken = () => !!localStorage.getItem("chatGPTToken");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const buildCombinedQuery = (history: ChatEntry[], newMessage: string) => {
    const previous = history.map((e) => e.userMessage);
    return [...previous, newMessage].join(", ");
  };

  const isProcessing = chatHistory.some(
    (e) => e.status === "thinking" || e.status === "finding"
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isProcessing) return;

    const newId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const combinedQuery = buildCombinedQuery(chatHistory, trimmed);

    const newEntry: ChatEntry = {
      id: newId,
      userMessage: trimmed,
      combinedQuery,
      status: "thinking",
    };

    setChatHistory((prev) => [...prev, newEntry]);
    handleAISearch(combinedQuery);
    setInputValue("");

    setTimeout(() => {
      setChatHistory((prev) =>
        prev.map((e) => (e.id === newId ? { ...e, status: "finding" } : e))
      );
      setTimeout(() => {
        setChatHistory((prev) =>
          prev.map((e) => (e.id === newId ? { ...e, status: "done" } : e))
        );
      }, 2000);
    }, 2500);
  };

  const handleRevertTo = (entry: ChatEntry) => {
    const index = chatHistory.findIndex((e) => e.id === entry.id);
    setChatHistory(
      chatHistory
        .slice(0, index + 1)
        .map((e) => (e.id === entry.id ? { ...e, status: "done" } : e))
    );
    handleAISearch(entry.combinedQuery);
    setInputValue("");
  };

  const handleButtonClick = () => {
    if (!isToken() && !aiDemoMode) {
      setShowTokenModal(true);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {isOpen && (
        <div
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl mb-4 w-80 sm:w-96 flex flex-col overflow-hidden"
          style={{ height: "480px" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-500 dark:bg-blue-600 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <MdOutlineSavedSearch size={20} className="text-white" />
              <span className="text-white font-semibold text-sm">
                AI Search{" "}
                {aiDemoMode && (
                  <span className="text-blue-200 text-xs font-normal">
                    (Demo)
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              {chatHistory.length > 0 && (
                <button
                  onClick={() => {
                    setChatHistory([]);
                    setInputValue("");
                  }}
                  className="text-blue-200 hover:text-white focus:outline-none transition-colors text-xs"
                  title="Start a new search">
                  New
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 focus:outline-none transition-colors">
                <MdClose size={20} />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-gray-400 dark:text-gray-500">
                <MdOutlineSavedSearch size={48} />
                <p className="text-sm px-4">{t("Describe")}</p>
              </div>
            ) : (
              chatHistory.map((entry, index) => (
                <div key={entry.id} className="space-y-1.5">
                  {/* User bubble */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 dark:bg-blue-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[78%] text-sm leading-relaxed">
                      {entry.userMessage}
                    </div>
                  </div>

                  {/* AI bubble */}
                  <div className="flex flex-col items-start">
                    <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[78%] text-sm leading-relaxed">
                      {entry.status === "thinking" && (
                        <span className="flex items-center space-x-1">
                          <span
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </span>
                      )}
                      {entry.status === "finding" && (
                        <span className="text-gray-500 dark:text-gray-400 animate-pulse">
                          {t("AIFindings")}…
                        </span>
                      )}
                      {entry.status === "done" && (
                        <span>
                          Here's what I found in theme with{" "}
                          <span className="italic">
                            &ldquo;{entry.combinedQuery}&rdquo;
                          </span>{" "}
                          ✨
                        </span>
                      )}
                    </div>

                    {/* Revert button — only on non-last done entries */}
                    {entry.status === "done" &&
                      index < chatHistory.length - 1 && (
                        <button
                          onClick={() => handleRevertTo(entry)}
                          className="mt-1.5 ml-1 flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none"
                          title="Revert to this point and continue from here">
                          <FiRotateCcw size={11} />
                          <span>Continue from here</span>
                        </button>
                      )}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-3">
            <form onSubmit={handleSubmit} className="flex items-end space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  chatHistory.length === 0 ? t("Describe") : "Refine your search…"
                }
                rows={2}
                disabled={isProcessing}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isProcessing || !inputValue.trim()}
                className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
                <MdSend size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 dark:bg-blue-600 shadow-xl shadow-black/30 text-white h-10 px-4 rounded-xl flex items-center space-x-1.5 transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
        <MdOutlineSavedSearch size={20} />
        <span className="text-sm font-medium">
          {aiDemoMode ? "Demo" : t("AIFind")}
        </span>
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
