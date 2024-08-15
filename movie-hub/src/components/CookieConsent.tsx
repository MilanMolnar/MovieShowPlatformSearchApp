// src/components/CookieConsent.tsx

import React from "react";
import TMDBLogo from "../assets/TMDB.svg";

interface Props {
  onAccept: () => void;
}

const CookieConsent: React.FC<Props> = ({ onAccept }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center z-50">
      <div className="flex items-center mb-2 sm:mb-0">
        <img src={TMDBLogo} alt="TMDB Logo" className="h-8 mr-2" />
        <span className="text-sm">
          This application proudly uses the TMDB API in accordance with their
          fair use policy. Please note that we are not affiliated with TMDB. We
          use cookies to improve your browsing experience.
        </span>
      </div>
      <button
        onClick={onAccept}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
