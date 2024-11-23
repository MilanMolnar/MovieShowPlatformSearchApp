import React, { useEffect, useState } from "react";

const ChatGPTTokenInput: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [savedToken, setSavedToken] = useState<string | null>(null);

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
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-4 py-3 pb-4 sm:max-w-sm md:max-w-lg lg:max-w-xl w-full transform transition-transform"
      >
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-3">
          {savedToken ? "Token Saved" : "Enter ChatGPT Token"}
        </h2>
        <div className="text-center">
        <div className="flex justify-center space-x-4">
          <input
            type="text"
            value={token || savedToken ? "************************************" : token} 
            onChange={(e) => setToken(e.target.value)}
            className="w-full bg-gray-100 px-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            disabled={savedToken !== null}
          />
          
            {!savedToken ? (
              <button
                onClick={handleSaveToken}
                className="bg-blue-500 dark:bg-blue-600 px-2 w-12 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleClearToken}
                className="bg-red-500 dark:bg-red-600 px-2 w-12 text-white px-2 rounded-md transition duration-300 ease-in-out hover:bg-red-600 dark:hover:bg-red-500 focus:outline-none"
              >
                X
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTTokenInput;
