import React from "react";
import DataTable from "react-data-table-component";
import Layout from "../Layout";

const columns = [
  {
    name: "Employee",
    selector: (row) => row.emp,
  },
  {
    name: "Total Working Hour",
    selector: (row) => row.wokinghour,
  },
  {
    name: "Bonus",
    selector: (row) => row.bonus,
  },
  {
    name: "Total",
    selector: (row) => row.totalAmount,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];

const data = [
  {
    id: 1,
    emp: "Jack",
    wokinghour: 35,
    bonus: 3000,
    totalAmount: 500000,
    status: "Pending",
  },
  {
    id: 2,
    emp: "John",
    wokinghour: 35,
    bonus: 3000,
    totalAmount: 500000,
    status: "Paid",
  },
];
const UserDashboard = () => {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="w-full flex">
        <div className="w-1/2">
          <div className="px-4 pt-4">
            <DataTable
              title="Payroll List"
              columns={columns}
              data={data}
              pagination
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-full grid grid-cols-12 gap-4 px-4 mt-4">
            {/* total employee */}
            <div className="col-span-6 bg-gray-200 rounded-lg">
              <span className="block px-4 py-2">Total Earning</span>
              <span className="block px-4 mb-2">3000000</span>
            </div>
            {/* total employee */}
            <div className="col-span-6 bg-gray-200 rounded-lg">
              <span className="block px-4 py-2">Attendence / Late</span>
              <span className="block px-4 mb-2">30 / 0</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
