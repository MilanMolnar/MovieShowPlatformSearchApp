import React, { createContext, useState, useEffect, useContext } from "react";
import initReactI18next from "../translationInit";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
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
    initReactI18next.changeLanguage(language);
    localStorage.setItem("language", language);
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
