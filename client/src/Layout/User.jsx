import React from "react";
import Component from "../components";

const UserLayout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Component.Navigation />
      <div className="overflow-y-scroll">{children}</div>
    </div>
  );
};

export default UserLayout;
