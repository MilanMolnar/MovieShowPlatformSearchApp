import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoLight from "../assets/light_logo.webp";
import logoDark from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useDarkMode } from "../providers/DarkmodeContextProvider";
import SearchBox from "./SearchBox";
import { useAuth } from "../providers/AuthContextProvider";
import { useTranslation } from "react-i18next";
import { FaFlagUsa, FaFlag } from "react-icons/fa";
import { useLanguage } from "../providers/LanguageContextProvider";
import gb_flag from "../assets/gb.png";
import hu_flag from "../assets/hun.png";

const NavBar: React.FC = () => {
  const { darkMode } = useDarkMode();
  const { userProfile } = useAuth(); // Access the user's profile
  const { i18n } = useTranslation();
  const { language, toggleLanguage } = useLanguage(); // Use useLanguage hook
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language); // Sync the i18n language with the context language
  }, [language, i18n]);

  const logo = darkMode ? logoDark : logoLight;
  const logoSrc = `${logo}?timestamp=${Date.now()}`;

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload(); // Reload the page if already on the homepage
    } else {
      navigate("/"); // Navigate to the homepage if on a different page
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-gray-100 dark:bg-gray-900">
      <div className="w-full md:w-auto flex justify-between items-center mb-4 md:mb-0">
        <button onClick={handleLogoClick} className="md:mr-4">
          <img
            src={logoSrc}
            alt="logo"
            className="w-24 min-w-20 h-auto md:w-20 md:h-20 shadow"
          />
        </button>
        <div className="flex md:hidden items-center space-x-4 mr-5">
          <ColorModeSwitch />
          {userProfile ? (
            <Link to={"/profile"}>
              <img
                src={userProfile.picture}
                alt="Profile"
                className="w-11 min-w-11 h-11 min-h-11 rounded-full"
              />
            </Link>
          ) : (
            <span className="text-base text-gray-800 dark:text-gray-200">
              <Link to={"/profile"}>Login</Link>
            </span>
          )}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 md:hidden  rounded transition"
          >
            {language === "en" ? (
              <img
                src={hu_flag}
                alt="HU"
                className="w-7  mr-[5px] transition"
              />
            ) : (
              <img
                src={gb_flag}
                alt="GB"
                className="w-7  mr-[5px] transition"
              />
            )}
          </button>
        </div>
      </div>
      <div className="w-full mb-4 md:mb-0 mr-5">
        <SearchBox />
      </div>
      <div className="hidden md:flex items-center space-x-6 mr-5 sm:mr-5">
        <ColorModeSwitch />
        {userProfile ? (
          <Link to={"/profile"}>
            <img
              src={userProfile.picture}
              alt="Profile"
              className="w-11 min-w-11 h-11 min-h-11 rounded-full"
            />
          </Link>
        ) : (
          <span className="text-lg text-gray-800 dark:text-gray-200">
            <Link to={"/profile"}>Login</Link>
          </span>
        )}
      </div>
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 hidden md:flex rounded transition"
      >
        {language === "en" ? (
          <img
            src={hu_flag}
            alt="HU"
            className="w-7 mx-1 mr-[30px] transition"
          />
        ) : (
          <img
            src={gb_flag}
            alt="GB"
            className="w-7 mx-1 mr-[30px] transition"
          />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
