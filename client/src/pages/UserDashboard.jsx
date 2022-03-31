import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import UserLayout from "../Layout/User";
import moment from "moment";

// icons
import { Icons } from "../assets";

const columns = [
  {
    name: "Device",
    selector: (row) => row.device,
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

const UserDashboard = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [taskList, setTaskList] = useState([]);
  const [attList, setAttList] = useState([]);
  const [payroll, setPayroll] = useState();
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remark, setRemark] = useState("");
  const [taskId, setTaskId] = useState("");
  const [openModel, setOpenModel] = useState(false);

  const taskFetcher = async () => {
    await fetch(`${URL}/api/tasks/${localStorage.getItem("uid")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
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

  const payrollFetcher = async () => {
    await fetch(`${URL}/api/payroll/${localStorage.getItem("uid")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setPayroll(...resJson.data);
        } else {
          setPayroll();
        }
      })
      .catch((err) => {
        setPayroll();
      });
  };

  const attendanceFetcher = async () => {
    setAttList([]);
    setData([]);
    await fetch(`${URL}/api/attendence/${localStorage.getItem("uid")}`, {
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

  const searchAttendanceByRange = async () => {
    setAttList([]);
    setData([]);
    await fetch(
      `${URL}/api/attendence/${startDate}/${endDate}/${localStorage.getItem(
        "uid"
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
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

  const taskHandler = (id) => {
    setTaskId(id);
    setOpenModel(true);
  };

  const taskResover = async () => {
    await fetch(`${URL}/api/tasks/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: taskId,
        status: "success",
        remark: remark,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.meta.success) {
          window.alert("success");
        } else {
          window.alert("failed");
        }
      })
      .catch((err) => {
        window.alert("failed");
      });
    setOpenModel(false);
    setRemark("");
    setTaskId("");
    window.location.href = "/";
  };

  useEffect(() => {
    taskFetcher();
    payrollFetcher();
    attendanceFetcher();
  }, []);

  useEffect(() => {
    if (attList.length > 0) {
      setData([]);
      attList.map((item) => {
        setData([
          ...data,
          {
            id: item._id,
            device: item.deviceId ? item.deviceId.deviceId : "Self",
            checkedInTime: item.checkInTime
              ? moment(item.checkInTime).format("YYYY-MM-DD hh:mm:ss A")
              : "-",
            checkedOutTime: item.checkOutTime
              ? moment(item.checkOutTime).format("YYYY-MM-DD hh:mm:ss A")
              : "-",
            leave: item.isLeave ? "Leave" : "Not Leave",
          },
        ]);
      });
    }
  }, [attList]);

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
                <p className="text-sm font-semibold text-gray-500">
                  {payroll && payroll.totalAmount ? payroll.totalAmount : 0}
                </p>
              </div>

              {/* total attendence / late */}
              <div className="rounded-lg p-4 border border-gray-200">
                <Icons.Attendence className="text-primary w-6 h-6"></Icons.Attendence>
                <p className="mt-6 text-lg font-semibold text-gray-800">
                  Attendence
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  {attList.length}
                </p>
              </div>
            </div>

            <div className="w-full mt-12 px-4">
              <h1 className="text-lg font-bold">Tasks</h1>
              <div className="w-full mt-4 flex flex-col gap-3">
                {taskList &&
                  taskList.map((item, key) => {
                    return (
                      <div className="border border-gray-200 p-2 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold">
                            {item.title}
                          </p>
                          <div className="bg-warning px-2 py-1 rounded-md">
                            <p className="text-xs font-semibold">
                              {item.status}
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-gray-400">
                          {item.description}
                        </p>
                        <div className="mt-6 flex justify-between">
                          <p className="text-sm text-gray-400 font-semibold">
                            Assigned by{" "}
                            <span className="text-primary">
                              {item.assignedBy.fullname}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400 font-semibold">
                            <span
                              className="text-primary cursor-pointer"
                              onClick={() => {
                                taskHandler(item._id);
                              }}
                            >
                              Make As Done
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-2">
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
                <span className="text-sm text-gray-500 mx-2">Start</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="border p-1 px-2 rounded">
                <button onClick={searchAttendanceByRange}>Search</button>
              </div>
            </div>
          </div>
          <DataTable columns={columns} data={data} pagination />
        </div>
      </div>

      <div
        className={`${
          openModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center`}
      >
        <div>
          <h1 className="text-white text-xl mb-4 text-center">
            Please Enter Remark
          </h1>

          <input
            type="text"
            placeholder="Remark"
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <button
            className="block uppercase outline-none bg-blue-700 text-white rounded-md w-64 h-10 px-2 py-1 mb-2"
            onClick={taskResover}
          >
            Continue
          </button>

          <button
            className="block uppercase text-sm outline-none text-white rounded-md w-64 h-10 px-2 py-1 mb-2"
            onClick={() => setOpenModel(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
