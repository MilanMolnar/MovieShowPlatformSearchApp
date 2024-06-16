import { useDarkMode } from "../providers/DarkmodeContextProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorSwitch = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

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
            darkMode ? "translate-x-4 bg-gray-700" : "translate-x-0 bg-white"
          } flex justify-center items-center`}
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </span>
      </label>
    </div>
  );
};

export default ColorSwitch;
