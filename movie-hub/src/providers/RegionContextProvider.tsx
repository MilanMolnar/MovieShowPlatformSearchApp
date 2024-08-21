import React, { createContext, useContext, useState, ReactNode } from "react";
import { Region } from "../hooks/useRegions"; // Import Region interface
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContextProvider";

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [region, setRegion] = useState<Region>({
    iso_3166_1: "HU",
    english_name: language === "en" ? "Hungary" : "Magyarország",
    native_name: language === "en" ? "Hungary" : "Magyarország",
  });

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = (): RegionContextType => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
