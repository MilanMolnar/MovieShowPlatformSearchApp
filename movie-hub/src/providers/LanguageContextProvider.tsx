import React, { createContext, useState, useEffect, useContext } from "react";
import initReactI18next from "../translationInit"; // Assuming this is your i18next initialization

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void; // Update to have a setter function
}

interface Props {
  children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageContextProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    initReactI18next.changeLanguage(language); // Sync the i18n language with the context language
    localStorage.setItem("language", language); // Save language in local storage
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageContextProvider"
    );
  }
  return context;
};
