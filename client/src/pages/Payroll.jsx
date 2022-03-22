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
    emp: 0,
    bonus: 0,
  });

  const taskFetcher = async () => {
    await fetch(`${URL}/api/payroll`, {
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

  console.log(payrollList);

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

  const payrollCreator = async () => {
    await fetch(`${URL}/api/payroll/caculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        empId: form.emp,
        bonus: form.bonus,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setForm({
            emp: 0,
            bonus: 0,
          });
          setOpenModel(false);
          window.alert("Success");
          taskFetcher();
        } else {
          setForm({
            emp: 0,
            bonus: 0,
          });
          setOpenModel(false);
          window.alert("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
        setForm({
          emp: 0,
          bonus: 0,
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
            emp: item.empId.fullname,
            wokinghour: item.totalWorkingHour,
            bonus: item.bonus,
            totalAmount: item.totalWorkingHour + item.bonus,
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
          onClick={() => setOpenModel(true)}
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

      <div
        className={`${
          openModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm`}
      >
        <div className="border px-4 py-4 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-black text-xl mb-4 text-center">
            Caculate Payroll
          </h1>

          <select
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, emp: e.target.value })}
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
          <input
            type="number"
            placeholder="Bonus"
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.bonus}
            onChange={(e) => setForm({ ...form, bonus: e.target.value })}
          />

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
              onClick={payrollCreator}
            >
              <p className="text-sm font-semibold">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payroll;
