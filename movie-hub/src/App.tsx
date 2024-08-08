import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AnotherPage from "./pages/AnotherPage";
import { SearchProvider } from "./providers/SearchmodeContextProvider";
import { DarkModeProvider } from "./providers/DarkmodeContextProvider";

export default function App() {
  return (
    <SearchProvider>
      <DarkModeProvider>
        <Router>
          <Routes>
            {/* Define a route with a layout wrapper */}
            <Route path="/" element={<Layout />}>
              {/* Nested routes inherit the layout */}
              <Route index element={<HomePage />} />
              <Route path="another" element={<AnotherPage />} />
            </Route>
          </Routes>
        </Router>
      </DarkModeProvider>
    </SearchProvider>
  );
}
