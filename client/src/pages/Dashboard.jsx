import React from "react";
import Layout from "../Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full grid grid-cols-12 gap-4 px-4 mt-4">
        {/* total employee */}
        <div className="col-span-3 bg-gray-200 rounded-lg">
          <span className="block px-4 py-2">Total Employees</span>
          <span className="block px-4 mb-2">30</span>
        </div>
        {/* total employee */}
        <div className="col-span-3 bg-gray-200 rounded-lg">
          <span className="block px-4 py-2">Attendence / Late</span>
          <span className="block px-4 mb-2">30 / 0</span>
        </div>
        {/* total employee */}
        <div className="col-span-3 bg-gray-200 rounded-lg">
          <span className="block px-4 py-2">Total leave</span>
          <span className="block px-4 mb-2">30</span>
        </div>
        {/* total employee */}
        <div className="col-span-3 bg-gray-200 rounded-lg">
          <span className="block px-4 py-2">Total Task</span>
          <span className="block px-4 mb-2">30</span>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
