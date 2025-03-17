import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoLight from "../assets/light_logo.webp";
import logoDark from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useDarkMode } from "../providers/DarkmodeContextProvider";
import SearchBox from "./SearchBox";
import { useAuth } from "../providers/AuthContextProvider";
import LanguageSelector from "./LanguageSelector";

const NavBar: React.FC = () => {
  const { darkMode } = useDarkMode();
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="relative flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex items-center">
        <button onClick={handleLogoClick}>
          <img src={logoSrc} alt="logo" className="w-20 shadow" />
        </button>
      </div>

      <div className="flex-grow mx-4">
        <SearchBox />
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex flex-row items-center space-x-4">
        <ColorModeSwitch />
        {userProfile ? (
          <Link to="/profile">
            <img
              src={userProfile.picture}
              alt="Profile"
              className="w-11 h-11 rounded-full"
            />
          </Link>
        ) : (
          <span className="text-lg text-gray-800 dark:text-gray-200">
            <Link to="/profile">Login</Link>
          </span>
        )}
        <LanguageSelector />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded focus:outline-none focus:ring">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown with fade in/out animation */}
      <div
        className={`fixed top-16 right-4 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col items-center space-y-4 shadow-xl shadow-gray-300 dark:shadow-gray-950 w-24 p-6 transition-opacity duration-300 z-[99999] ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        {userProfile ? (
          <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={userProfile.picture}
              alt="Profile"
              className="w-11 h-11 rounded-full"
            />
          </Link>
        ) : (
          <Link
            to="/profile"
            className="text-lg text-gray-800 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(false)}>
            Login
          </Link>
        )}
        <ColorModeSwitch />

        <LanguageSelector />
      </div>
    </nav>
  );
};

export default NavBar;
