import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoLight from "../assets/light_logo.webp";
import logoDark from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useDarkMode } from "../providers/DarkmodeContextProvider";
import SearchBox from "./SearchBox";
import { useAuth } from "../providers/AuthContextProvider";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector"; // Import LanguageSelector

const NavBar: React.FC = () => {
  const { darkMode } = useDarkMode();
  const { userProfile } = useAuth();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const logo = darkMode ? logoDark : logoLight;
  const logoSrc = `${logo}?timestamp=${Date.now()}`;

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
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
          <div className="flex md:hidden mx-2">
            <LanguageSelector /> {/* Add LanguageSelector here */}
          </div>
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
      <div className="hidden md:flex items-center space-x-4 mx-3">
        <LanguageSelector /> {/* Add LanguageSelector here */}
      </div>
    </nav>
  );
};

export default NavBar;
