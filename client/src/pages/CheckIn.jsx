import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import DataTable from "react-data-table-component";
import moment from "moment";

const columns = [
  {
    name: "Device",
    selector: (row) => row.device,
  },
  {
    name: "Employee",
    selector: (row) => row.employee,
  },
  {
    name: "Checked In Time",
    selector: (row) => row.checkedInTime,
  },
  {
    name: "Checked Out Time",
    selector: (row) => row.checkedOutTime,
  },
];

const data = [
  {
    id: 1,
    device: "Device001",
    employee: "Jack",
    checkedInTime: moment().format("YYYY-MM-DD HH:mm:ss a"),
    checkedOutTime: moment().format("YYYY-MM-DD HH:mm:ss a"),
  },
  {
    id: 2,
    device: "Device002",
    employee: "Alex",
    checkedInTime: moment().format("YYYY-MM-DD HH:mm:ss a"),
    checkedOutTime: moment().format("YYYY-MM-DD HH:mm:ss a"),
  },
];

const CheckIn = () => {
  return (
    <Layout>
      <div className="px-4 pt-4">
        <DataTable
          title="Attendance"
          columns={columns}
          data={data}
          pagination
        />
      </div>
    </Layout>
  );
};

export default CheckIn;
