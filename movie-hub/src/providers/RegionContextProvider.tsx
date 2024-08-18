import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface RegionContextType {
  region: string;
  setRegion: (region: string) => void;
}

// Create the context with default values
const RegionContext = createContext<RegionContextType | undefined>(undefined);

// Create a provider component
export const RegionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [region, setRegion] = useState<string>("HU"); // Default region

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

// Create a custom hook to use the context
export const useRegion = (): RegionContextType => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
