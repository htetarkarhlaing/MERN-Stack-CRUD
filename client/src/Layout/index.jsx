import React from "react";
import Component from "../components";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Component.Navigation />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Component.SideBar />
        </div>
        <div className="col-span-10 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
