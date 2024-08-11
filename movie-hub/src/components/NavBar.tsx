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
    <nav className="flex flex-col md:flex-row items-center bg-gray-100 dark:bg-gray-900">
      <Link to={"/"} className="mb-4 md:mb-0">
        <img
          src={logoSrc}
          alt="logo"
          className="w-24 h-auto md:w-20 md:h-20 shadow"
        />
      </Link>
      <div className="flex flex-col md:flex-row justify-between w-full">
        <SearchBox />
        <ul id="right-nav" className="flex items-center space-x-6 mt-4 md:mt-0">
          <ColorModeSwitch />
          <li className="text-base text-gray-800 dark:text-gray-200">
            Profile
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
