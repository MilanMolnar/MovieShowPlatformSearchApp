import React, { createContext, useState, useContext, useEffect } from "react";

interface UserProfile {
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
