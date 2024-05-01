import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center bg-[#ece900] capitalize font-medium p-6 gap-6">
      <Link to="segments">segments</Link>
      <Link to="users">users</Link>
    </div>
  );
};

export default Navbar;
