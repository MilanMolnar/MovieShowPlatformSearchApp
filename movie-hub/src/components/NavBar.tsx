import React from "react";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    //want to create a horizontally stacking items for navbar component, the fist element should be the logo.webp found in the public folder use tailwind where aplicable
    <nav className="flex items-center p-2">
      <img src={logo} alt="logo" className="w-16 rounded shadow" />
      <ul className="flex">
        <li className="ml-4">Profile</li>
      </ul>
    </nav>
  );
};

export default NavBar;
