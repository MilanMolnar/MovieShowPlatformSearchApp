// DarkModeContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";

interface ColormodeModeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const DarkModeContext = createContext<ColormodeModeContext | undefined>(
  undefined
);

export const DarkModeProvider = ({ children }: Props) => {
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
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
