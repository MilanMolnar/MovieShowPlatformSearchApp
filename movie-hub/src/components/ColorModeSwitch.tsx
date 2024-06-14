import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true; // default to dark mode
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white appearance-none cursor-pointer opacity-0"
      />
      <label
        htmlFor="toggle"
        className={`toggle-label block overflow-hidden h-6 rounded-full ${
          darkMode ? "bg-gray-300" : "bg-green-500"
        } cursor-pointer`}
      >
        <span
          className={`toggle-dot absolute w-6 h-6 rounded-full shadow inset-y-0 left-0 transform transition-transform duration-200 ease-in-out ${
            darkMode ? "translate-x-4 bg-gray-900" : "translate-x-0 bg-white"
          } flex justify-center items-center`}
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
