/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";

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
  const [attList, setAttList] = useState([]);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const taskFetcher = async () => {
    setAttList([]);
    setData([]);
    await fetch(`${URL}/api/attendence`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.meta.success) {
          setAttList(resJson.data);
        } else {
          setAttList([]);
        }
      })
      .catch((err) => {
        setAttList([]);
      });
  };

  const searchPayrollByRange = async () => {
    setAttList([]);
    setData([]);
    await fetch(`${URL}/api/attendence/${startDate}/${endDate}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.meta.success) {
          setAttList(resJson.data);
        } else {
          setAttList([]);
        }
      })
      .catch((err) => {
        setAttList([]);
      });
  };

  const dataBuilder = async () => {
    if (attList.length > 0) {
      setData([]);
      var temp = [];
      await attList.map((item) => {
        temp.push({
          id: item._id,
          employee: item.accountId.fullname || "",
          device: item.deviceId ? item.deviceId.deviceId : "Self",
          checkedInTime: item.checkInTime
            ? moment(item.checkInTime).format("YYYY-MM-DD hh:mm:ss A")
            : "-",
          checkedOutTime: item.checkOutTime
            ? moment(item.checkOutTime).format("YYYY-MM-DD hh:mm:ss A")
            : "-",
          leave: item.isLeave ? "Leave" : "Not Leave",
        });
      });
      setData(temp);
    }
  };

  useEffect(() => {
    taskFetcher();
  }, []);

  useEffect(() => {
    dataBuilder();
  }, [attList]);

  console.log(attList);
  console.log(data);

  return (
    <Layout>
      <div className="px-4 pt-4">
        <div className="mb-6 font-semibold text-xs text-gray-400 uppercase">
          <span>Attendence</span>
          <span className="px-1">/</span>
          <span className="text-gray-500">List</span>
        </div>
        <div className="w-full px-4 py-2 flex justify-between">
          <span className="text-lg">Attendance List</span>
          <div className="flex">
            <div className="border p-1 rounded mr-2">
              <span className="text-sm text-gray-500 mx-2">Start</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="border p-1 rounded mr-2">
              <span className="text-sm text-gray-500 mx-2">End</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="border p-1 px-2 rounded">
              <button onClick={searchPayrollByRange}>Search</button>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={data} pagination />
      </div>
    </Layout>
  );
};

export default CheckIn;
