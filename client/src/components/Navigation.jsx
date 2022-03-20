import React from "react";

const Navigation = () => {
  return (
    <div className="w-full h-16 bg-slate-500 flex items-center px-10 justify-between">
      <div>Logo</div>
      <div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;
