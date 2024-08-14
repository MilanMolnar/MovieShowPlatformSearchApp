import React, { useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { useAuth } from "../providers/AuthContextProvider";

const CLIENT_ID = "";

interface UserProfile {
  email: string;
  name: string;
  picture: string;
}

const base64UrlToBase64 = (base64Url: string) => {
  return base64Url.replace(/-/g, "+").replace(/_/g, "/");
};

const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const textDecoder = new TextDecoder("utf-8");
  return textDecoder.decode(bytes);
};

const parseJwt = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const payload = parts[1];
  const base64 = base64UrlToBase64(payload);
  const decodedPayload = decodeBase64(base64);
  return JSON.parse(decodedPayload);
};

const AuthContainer: React.FC = () => {
  const { userProfile, setUserProfile } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }
  }, [setUserProfile]);

  const handleLoginSuccess = (credentialResponse: any) => {
    try {
      const decoded = parseJwt(credentialResponse.credential) as UserProfile;
      localStorage.setItem("googleUser", JSON.stringify(decoded));
      setUserProfile(decoded);
      console.log("Login Success:", decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("googleUser");
    setUserProfile(null);
    console.log("User logged out");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-10 sm:max-w-sm md:max-w-lg lg:max-w-xl w-full transform transition-transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
            Account
          </h2>
          {!userProfile ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Please log in to continue
              </p>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden shadow-lg mb-6">
                <img
                  src={userProfile.picture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome, {userProfile.name}!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {userProfile.email}
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthContainer;
