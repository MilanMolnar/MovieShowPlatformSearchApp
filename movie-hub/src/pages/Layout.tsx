// src/components/Layout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-grow flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
