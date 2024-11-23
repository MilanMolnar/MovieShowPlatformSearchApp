import { useTranslation } from "react-i18next";
import { useDarkMode } from "../providers/DarkmodeContextProvider";

const CreditFooter = () => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-opacity-0 hidden sm:flex pointer-events-none dark:text-gray-200 p-4 flex flex-col sm:flex-row items-center z-50">
      <div className="flex items-center mb-2 sm:mb-0 ml-5">
        <span className="text-m select-none w-96 lg:w-[700px] lm:w-full">
          {t("credit_footer_message")}
        </span>
        <a
          className="font-bold ml-5 flex pointer-events-auto relative"
          href="https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber"
        >
          {darkMode && (
            <div className="absolute inset-0 flex justify-center items-center w-32 -m-2 rounded-full dark:bg-white"></div>
          )}

          {/* Vercel Logo */}
          <svg
            width="30"
            height="25"
            viewBox="0 0 76 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 fill-black"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>

          {/* Vercel Text */}
          <span className="relative z-10 text-black text-lg select-none dark:text-black ml-2">
            {t("vercel")}
          </span>
        </a>
      </div>
    </div>
  );
};

export default CreditFooter;
