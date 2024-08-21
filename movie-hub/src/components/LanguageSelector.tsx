import React from "react";
import { useLanguage } from "../providers/LanguageContextProvider";
import hu_flag from "../assets/hun.png";
import gb_flag from "../assets/gb.png";
import es_flag from "../assets/es.png";
import ge_flag from "../assets/ge.png";
import ja_flag from "../assets/ja.png";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "GB", flag: gb_flag },
    { code: "hu", label: "HU", flag: hu_flag },
    { code: "es", label: "ES", flag: es_flag },
    { code: "ge", label: "GE", flag: ge_flag },
    { code: "ja", label: "JP", flag: ja_flag },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="relative w-32">
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <img
          src={
            languages.find((lang) => lang.code === language)?.flag || gb_flag
          }
          alt={language}
          className="w-6 h-6"
        />
      </div>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
