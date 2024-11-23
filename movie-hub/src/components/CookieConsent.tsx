import TMDBLogo from "../assets/TMDB.svg";
import { useTranslation } from "react-i18next";

interface Props {
  onAccept: () => void;
}

const CookieConsent= ({ onAccept }:Props) => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center z-50">
      <div className="flex items-center mb-2 sm:mb-0">
        <a href="https://www.themoviedb.org/">
          <img src={TMDBLogo} alt="TMDB Logo" className="h-8 mr-2" />
        </a>
        <span className="text-sm">{t("cookie_consent_message")}</span>
      </div>
      <button
        onClick={onAccept}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {t("accept_button")}
      </button>
    </div>
  );
};

export default CookieConsent;
