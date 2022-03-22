import React from "react";
import DataTable from "react-data-table-component";

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
    <div className="w-full h-screen">
      <div className="w-full h-16 bg-gray-300">Logo</div>
      <button
        className="absolute right-5 top-3 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"
        onClick={logoutHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>

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
    </div>
  );
};

export default UserDashboard;
