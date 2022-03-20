import React from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Dashboard", route: "/", icons: "" },
  { label: "Employees", route: "/employee", icons: "" },
  { label: "Payroll", route: "/payroll", icons: "" },
  { label: "Attendance", route: "/attendance", icons: "" },
  { label: "Task", route: "/task", icons: "" },
];

const SideBar = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div>
        <ul className="">
          {links.map((item, key) => {
            return (
              <Link to={item.route} key={key}>
                <li className="text-gray-400 font-bold uppercase py-2 px-2 cursor-pointer">
                  <span>{item.label}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
