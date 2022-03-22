import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";

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

const Payroll = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [openModel, setOpenModel] = useState(false);
  const [empList, setEmpList] = useState();
  const [payrollList, setPayrollList] = useState([]);
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
          setPayrollList(resJson.data);
        } else {
          setPayrollList([]);
        }
      })
      .catch((err) => {
        setPayrollList([]);
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
    if (payrollList.length > 0) {
      setData([]);
      payrollList.map((item) => {
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
  }, [payrollList]);
  return (
    <Layout>
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/payroll">
          <div className="pt-4 mb-6 font-semibold text-xs text-gray-400 uppercase">
            <span>Payroll</span>
            <span className="px-1">/</span>
            <span className="text-gray-500">List</span>
          </div>
        </Link>

        <button
          className="outline-none px-4 py-2 rounded-lg bg-primary"
          // onClick={() => setOpenModel(true)}
        >
          <p className="font-semibold text-white text-sm">Caculate Payroll</p>
        </button>
      </div>
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
