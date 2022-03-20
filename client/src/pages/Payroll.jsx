import React from "react";
import Layout from "../Layout";

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

const Payroll = () => {
  return (
    <Layout>
      <div className="px-4 pt-4">
        <DataTable
          title="Payroll List"
          columns={columns}
          data={data}
          pagination
        />
      </div>
    </Layout>
  );
};

export default Payroll;
