import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" relative min-h-screen w-full flex items-center justify-center bg-white">
      <div className="absolute min-h-[90vh] min-w-[80vw] bg-[#ece900] rounded backdrop-blur flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">SAM</h1>
        <p className="text-xl font-medium">Snap Audience Match</p>
        <Link
          to="/api/auth/redirect"
          target="_blank"
          className="bg-white rounded-md p-4 font-bold hover:bg-black hover:text-white"
        >
          Authorize SAM
        </Link>
      </div>
    </div>
  );
};

export default Home;
