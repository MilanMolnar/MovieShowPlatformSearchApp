import React from "react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    //want to create a horizontally stacking items for navbar component, the fist element should be the logo.webp found in the public folder use tailwind where aplicable
    <nav className="flex items-center p-2">
      <img src={logo} alt="logo" className="w-16 h-16 rounded-full shadow" />
      <div className="flex justify-between w-full">
        <ul id="left-nav" className="flex">
          <li className="ml-4">search</li>
        </ul>
        <ul id="right-nav" className="flex">
          <ColorModeSwitch />
          <li className="ml-4">Profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
