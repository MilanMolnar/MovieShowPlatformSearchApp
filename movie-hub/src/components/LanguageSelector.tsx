import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../providers/LanguageContextProvider";
import hu_flag from "../assets/hun.png";
import gb_flag from "../assets/gb.png";
import es_flag from "../assets/es.png";
import ge_flag from "../assets/ge.png";
import ja_flag from "../assets/ja.png";

const languages = [
  { code: "en", label: "EN", flag: gb_flag },
  { code: "hu", label: "HU", flag: hu_flag },
  { code: "es", label: "ES", flag: es_flag },
  { code: "ge", label: "DE", flag: ge_flag },
  { code: "ja", label: "JP", flag: ja_flag },
];

// Custom hook to check if screen width is below a breakpoint (mobile)
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const MobileLanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Flag circle as dropdown trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-8 h-8 mt-1 rounded-full cursor-pointer overflow-hidden">
        <img
          src={
            languages.find((lang) => lang.code === language)?.flag || gb_flag
          }
          alt={language}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Custom dropdown */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-24 bg-gray-200 dark:bg-gray-800 rounded shadow-lg z-10">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <img src={lang.flag} alt={lang.label} className="w-6 h-6 mr-2" />
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DesktopLanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="relative w-24 bg-gray-200 dark:bg-gray-800 rounded-auto">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-2 focus:outline-none">
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <img
          src={
            languages.find((lang) => lang.code === language)?.flag || gb_flag
          }
          alt={language}
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};

const LanguageSelector: React.FC = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileLanguageSelector /> : <DesktopLanguageSelector />;
};

export default LanguageSelector;
