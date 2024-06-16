import { useEffect } from "react";
import logoLight from "../assets/light_logo.webp";
import logoDark from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useDarkMode } from "../providers/DarkmodeContextProvider";
import SearchBox from "./SearchBox";

interface Props {
  onSearch: (searchQuery: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
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

  const handleLogoClick = () => {
    // Refresh the page
    window.location.reload();
  };

  return (
    <nav className="flex items-start bg-gray-100 dark:bg-gray-900">
      <img
        src={logoSrc}
        onClick={handleLogoClick}
        alt="logo"
        className="w-20 h-20 shadow"
      />
      <div className="px-8 py-6 flex justify-between w-full">
        <SearchBox onSearch={onSearch} />
        <ul id="right-nav" className="flex px-2">
          <ColorModeSwitch />
          <li className="px-6 mt-1">Profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
