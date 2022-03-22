import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { Icons } from "../assets";

const links = [
  { label: "Dashboard", link: "/", icons: Icons.Dashboard },
  { label: "Employees", link: "/employee", icons: Icons.Employees },
  { label: "Payroll", link: "/payroll", icons: Icons.Payroll },
  { label: "Attendance", link: "/attendance", icons: Icons.Attendence },
  { label: "Device", link: "/device-page", icons: Icons.Device },
  { label: "Task", link: "/task", icons: Icons.Task },
];

const SideBar = () => {
  // instances
  const router = useLocation();
  const currentRoute = router.pathname;

  return (
    <div className="w-full h-screen bg-white border-r border-r-gray-200">
      <div>
        <ul className="p-2">
          {links.map((item, key) => {
            return (
              <Link to={item.link} key={key}>
                <div
                  className={`p-3 flex gap-2 items-center rounded-md cursor-pointer ${
                    currentRoute === item.link
                      ? "bg-primary shadow-md"
                      : "bg-transparent"
                  } ${item.name === "Search" ? "hidden" : ""}`}
                >
                  <item.icons
                    className={`w-6 h-6 ${
                      currentRoute === item.link
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`font-semibold text-sm ${
                      currentRoute === item.link
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
