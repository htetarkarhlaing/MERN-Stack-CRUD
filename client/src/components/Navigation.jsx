import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full h-16 bg-primary flex items-center px-10 justify-between">
      <div>
        <p className="text-white font-bold">Logo.</p>
      </div>
      <div className="flex gap-4">
        <Link to={"/profile"}>
          <p className="text-sm text-white font-semibold">Profile</p>
        </Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <p className="text-sm text-white font-semibold">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
