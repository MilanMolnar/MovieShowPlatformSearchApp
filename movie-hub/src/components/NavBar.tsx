import React, { useEffect } from "react";
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
    <nav className="flex items-center px-4 py-2">
      <img
        key={logoSrc}
        src={logoSrc}
        alt="logo"
        className="w-16 h-16 rounded-full shadow"
      />
      <div className="flex justify-between w-full">
        <ul id="left-nav" className="flex">
          <li className="ml-4">search</li>
        </ul>
        <ul id="right-nav" className="flex">
          <ColorModeSwitch />
          <li className="ml-4">Profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
