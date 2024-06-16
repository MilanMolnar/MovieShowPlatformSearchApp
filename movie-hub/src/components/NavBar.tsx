import { useEffect } from "react";
import logoLight from "../assets/light_logo.webp";
import logoDark from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useDarkMode } from "../providers/DarkmodeContextProvider";

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
    <nav className="flex items-start">
      <img src={logoSrc} alt="logo" className="w-20 h-20 shadow" />
      <div className="px-8 py-6 flex justify-between w-full">
        <ul id="left-nav" className="flex px-2">
          <li>search</li>
        </ul>
        <ul id="right-nav" className="flex px-2">
          <ColorModeSwitch />
          <li className="px-6">Profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
