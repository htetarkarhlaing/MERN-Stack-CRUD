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

const CheckIn = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [openModel, setOpenModel] = useState(false);
  const [empList, setEmpList] = useState();
  const [taskList, setTaskList] = useState([]);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: 0,
  });

  const taskFetcher = async () => {
    await fetch(`${URL}/api/tasks`, {
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

  const empFetcher = async () => {
    await fetch(`${URL}/api/accounts/staff`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setEmpList(resJson.data);
        } else {
          setEmpList([]);
        }
      })
      .catch((err) => {
        setEmpList([]);
      });
  };

  const taskCreator = async () => {
    await fetch(`${URL}/api/tasks/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        assignedTo: form.assignedTo,
        assignedBy: localStorage.getItem("uid"),
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setForm({
            title: "",
            description: "",
            assignedTo: "",
          });
          setOpenModel(false);
          window.alert("Success");
          taskFetcher();
        } else {
          setForm({
            title: "",
            description: "",
            assignedTo: "",
          });
          setOpenModel(false);
          window.alert("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
        setForm({
          title: "",
          description: "",
          assignedTo: "",
        });
        setOpenModel(false);
        window.alert("Something went wrong!");
      });
  };

  useEffect(() => {
    taskFetcher();
    empFetcher();
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
            title: item.title,
            description: item.description,
            assignedTo: item.assignedTo.fullname,
            assignedBy: item.assignedBy.fullname,
            remark: item.remark,
            status: item.status,
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
