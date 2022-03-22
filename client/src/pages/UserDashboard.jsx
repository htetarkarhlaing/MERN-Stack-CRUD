import React from "react";
import DataTable from "react-data-table-component";
import UserLayout from "../Layout/User";

// icons
import { Icons } from "../assets";

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
    <UserLayout>
      <div className="w-full grid grid-cols-3">
        <div className="w-full h-screen col-span-1 border-r border-r-gray-200">
          <div className="px-4 pt-4">
            <div className="w-full grid grid-cols-2 gap-4 px-4 mt-4">
              {/* total earning */}
              <div className="rounded-lg p-4 border border-gray-200">
                <Icons.Earning className="text-primary w-6 h-6"></Icons.Earning>
                <p className="mt-6 text-lg font-semibold text-gray-800">
                  Total Earning
                </p>
                <p className="text-sm font-semibold text-gray-500">30000</p>
              </div>

              {/* total attendence / late */}
              <div className="rounded-lg p-4 border border-gray-200">
                <Icons.Attendence className="text-primary w-6 h-6"></Icons.Attendence>
                <p className="mt-6 text-lg font-semibold text-gray-800">
                  Attendence / Late
                </p>
                <p className="text-sm font-semibold text-gray-500">30 / 0</p>
              </div>
            </div>

            <div className="w-full mt-12 px-4">
              <h1 className="text-lg font-bold">Tasks</h1>
              <div className="w-full mt-4 flex flex-col gap-3">
                <div className="border border-gray-200 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">To Code</p>
                    <div className="bg-warning px-2 py-1 rounded-md">
                      <p className="text-xs font-semibold">Pending</p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gray-400">
                    Clone the Youtube
                  </p>
                  <div className="mt-6 flex justify-between">
                    <p className="text-sm text-gray-400 font-semibold">
                      Assigned by{" "}
                      <span className="text-primary">Aung Htet</span>
                    </p>
                    <p className="text-sm text-gray-400 font-semibold">
                      Assigned to{" "}
                      <span className="text-primary">Maung Maung</span>
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 p-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">To Eat</p>
                    <div className="bg-success px-2 py-1 rounded-md">
                      <p className="text-xs font-semibold text-white">
                        Complete
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gray-400">
                    Eat nutrients properly
                  </p>
                  <div className="mt-6 flex justify-between">
                    <p className="text-sm text-gray-400 font-semibold">
                      Assigned by <span className="text-primary">Su Su</span>
                    </p>
                    <p className="text-sm text-gray-400 font-semibold">
                      Assigned to <span className="text-primary">Ko Ko</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-2">
          <DataTable
            title="Payroll List"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
