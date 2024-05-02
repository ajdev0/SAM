import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center bg-[#ece900] shadow-md capitalize font-medium p-6 gap-6">
      <Link className="text-sm hover:text-blue-500" to="dash/segments">
        segments
      </Link>
      <Link className="text-sm hover:text-blue-500" to="dash/users">
        users
      </Link>
    </div>
  );
};

export default Navbar;
