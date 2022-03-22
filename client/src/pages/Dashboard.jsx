import React, { useState, useEffect } from "react";
import Layout from "../Layout";

import { Icons } from "../assets";

const Dashboard = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [data, setData] = useState();

  const dataFetcher = async () => {
    await fetch(`${URL}/api/dashbaord`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setData(resJson.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataFetcher();
  }, []);

  return (
    <Layout>
      <div className="w-full grid grid-cols-4 gap-4 px-4 mt-4">
        {/* total employee */}
        <div className="rounded-lg p-4 border border-gray-200">
          <Icons.Employees className="text-primary w-6 h-6"></Icons.Employees>
          <p className="mt-6 text-lg font-semibold text-gray-800">
            Total Employees
          </p>
          <p className="text-sm font-semibold text-gray-500">
            {(data && data.emp) || 0}
          </p>
        </div>

        {/* total attendence */}
        <div className="rounded-lg p-4 border border-gray-200">
          <Icons.Attendence className="text-primary w-6 h-6"></Icons.Attendence>
          <p className="mt-6 text-lg font-semibold text-gray-800">Attendence</p>
          <p className="text-sm font-semibold text-gray-500">
            {" "}
            {(data && data.att) || 0}
          </p>
        </div>

        {/* total device */}
        <div className="rounded-lg p-4 border border-gray-200">
          <Icons.Device className="text-primary w-6 h-6"></Icons.Device>
          <p className="mt-6 text-lg font-semibold text-gray-800">Devices</p>
          <p className="text-sm font-semibold text-gray-500">
            {" "}
            {(data && data.device) || 0}
          </p>
        </div>

        {/* total tasks */}
        <div className="rounded-lg p-4 border border-gray-200">
          <Icons.Task className="text-primary w-6 h-6"></Icons.Task>
          <p className="mt-6 text-lg font-semibold text-gray-800">Tasks</p>
          <p className="text-sm font-semibold text-gray-500">
            {" "}
            {(data && data.task) || 0}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
