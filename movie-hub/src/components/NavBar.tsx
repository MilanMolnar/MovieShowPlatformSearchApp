import { useEffect } from "react";
import logoLight from "../assets/light_logo.webp";
import logoDark from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useDarkMode } from "../providers/DarkmodeContextProvider";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const logo = darkMode ? logoDark : logoLight;

  // Add a timestamp to the logo URL to bypass the cache
  const logoSrc = `${logo}?timestamp=${Date.now()}`;

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-gray-100 dark:bg-gray-900">
      <div className="w-full md:w-auto flex justify-between items-center mb-4 md:mb-0">
        <Link to={"/"} className="md:mr-4">
          <img
            src={logoSrc}
            alt="logo"
            className="w-24 min-w-20 h-auto md:w-20 md:h-20 shadow"
          />
        </Link>
        <div className="flex md:hidden items-center space-x-4 mr-5">
          <ColorModeSwitch />
          <span className="text-base text-gray-800 dark:text-gray-200">
            Profile
          </span>
        </div>
      </div>
      <div className="w-full mb-4 md:mb-0 mr-5">
        <SearchBox />
      </div>
      <div className="hidden md:flex items-center space-x-6 mr-5 sm:mr-5">
        <ColorModeSwitch />
        <span className="text-base text-gray-800 dark:text-gray-200 ">
          Profile
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
