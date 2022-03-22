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
  {
    name: "Leave",
    selector: (row) => row.leave,
  },
];

const CheckIn = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [taskList, setTaskList] = useState([]);
  const [data, setData] = useState([]);

  const taskFetcher = async () => {
    await fetch(`${URL}/api/attendence`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.meta.success) {
          setTaskList(resJson.data);
        } else {
          setTaskList([]);
        }
      })
      .catch((err) => {
        setTaskList([]);
      });
  };

  useEffect(() => {
    taskFetcher();
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      console.log(taskList);
      setData([]);
      taskList.map((item) => {
        setData([
          ...data,
          {
            id: item._id,
            device: item.deviceId.deviceId,
            employee: item.accountId.fullname,
            checkedInTime: item.createdAt,
            checkedOutTime: item.createdAt,
            leave: item.leave ? "Leave" : "Not Leave",
          },
        ]);
      });
    }
  }, [taskList]);

  return (
    <Layout>
      <div className="px-4 pt-4">
        <div className="mb-6 font-semibold text-xs text-gray-400 uppercase">
          <span>Attendence</span>
          <span className="px-1">/</span>
          <span className="text-gray-500">List</span>
        </div>
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
