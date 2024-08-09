import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import TvShowDetailPage from "./pages/TvShowDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { SearchProvider } from "./providers/SearchmodeContextProvider";
import { DarkModeProvider } from "./providers/DarkmodeContextProvider";

export default function App() {
  return (
    <SearchProvider>
      <DarkModeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
              <Route index element={<HomePage />} />
              <Route path="test" element={<TestPage />} />
              <Route path="tv/:id" element={<TvShowDetailPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Router>
      </DarkModeProvider>
    </SearchProvider>
  );
}
