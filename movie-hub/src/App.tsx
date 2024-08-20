import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TvShowDetailPage from "./pages/TvShowDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { SearchProvider } from "./providers/SearchmodeContextProvider";
import { DarkModeProvider } from "./providers/DarkmodeContextProvider";
import { AuthProvider } from "./providers/AuthContextProvider";
import { RegionProvider } from "./providers/RegionContextProvider";
import { LanguageContextProvider } from "./providers/LanguageContextProvider";

export default function App() {
  return (
    <LanguageContextProvider>
      <AuthProvider>
        <RegionProvider>
          <SearchProvider>
            <DarkModeProvider>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={<Layout />}
                    errorElement={<ErrorPage />}
                  >
                    <Route index element={<HomePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="tv/:id" element={<TvShowDetailPage />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
                </Routes>
              </Router>
            </DarkModeProvider>
          </SearchProvider>
        </RegionProvider>
      </AuthProvider>
    </LanguageContextProvider>
  );
}
