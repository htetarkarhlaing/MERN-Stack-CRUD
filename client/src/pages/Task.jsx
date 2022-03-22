import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Description",
    selector: (row) => row.description,
  },
  {
    name: "Assigned By",
    selector: (row) => row.assignedBy,
  },
  {
    name: "Assigned To",
    selector: (row) => row.assignedTo,
  },
  {
    name: "Remark",
    selector: (row) => row.remark,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];

const Task = () => {
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
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/task">
          <div className="pt-4 mb-6 font-semibold text-xs text-gray-400 uppercase">
            <span>Task</span>
            <span className="px-1">/</span>
            <span className="text-gray-500">List</span>
          </div>
        </Link>

        <button
          className="outline-none px-4 py-2 rounded-lg bg-primary"
          onClick={() => setOpenModel(true)}
        >
          <p className="font-semibold text-white text-sm">Create New Task</p>
        </button>
      </div>
      <div className="px-4 pt-4">
        <DataTable title="Task List" columns={columns} data={data} pagination />
      </div>
      <div
        className={`${
          openModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm`}
      >
        <div className="border px-4 py-4 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-black text-xl mb-4 text-center">
            Create New Task
          </h1>
          <input
            type="text"
            placeholder="Title"
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          >
            <option value={0}>-- select --</option>;
            {empList ? (
              empList.map((item, key) => {
                return (
                  <option key={key} value={item._id}>
                    {item.fullname}
                  </option>
                );
              })
            ) : (
              <option value="">Loading...</option>
            )}
          </select>

          <div className="flex justify-end items-center mt-6 mb-2">
            <button
              className="outline-none text-sm text-red-700 rounded-md w-32 px-4 py-2"
              onClick={() => {
                setForm({
                  title: "",
                  description: "",
                  assignedTo: "",
                });
                setOpenModel(false);
              }}
            >
              <p className="text-sm font-semibold">Cancel</p>
            </button>
            <button
              className="outline-none text-sm bg-primary text-white rounded-md w-32 px-4 py-2"
              onClick={taskCreator}
            >
              <p className="text-sm font-semibold">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Task;
