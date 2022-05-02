/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Moment from "react-moment";
import "moment-timezone";
import CloudinaryUploadWidget from "../components/CloudinaryWidget";

const Employee = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const STAFF_ID = process.env.REACT_APP_STAFF_ID;

  const [openModel, setOpenModel] = useState(false);
  const [empList, setEmpList] = useState();
  const [role, setRole] = useState([]);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    hourlyPaidRate: "",
    img: "",
    nrc: "",
    department: "",
    dateOfBirth: "",
    education: "",
    role: STAFF_ID,
  });

  const imageAdder = (url) => {
    setForm({
      ...form,
      img: url,
    });
  };

  const roleFetcher = async () => {
    await fetch(`${URL}/api/roles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setRole(resJson.data);
        } else {
          setRole([]);
        }
      })
      .catch((err) => {
        setRole([]);
      });
  };

  const empFetcher = async () => {
    await fetch(`${URL}/api/accounts/${STAFF_ID}`, {
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

  const empCreator = async () => {
    if (form.password !== form.confirmPassword) {
      window.alert("Password didn't match!");
    } else {
      await fetch(`${URL}/api/accounts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role,
          fullname: form.fullname,
          hourlyPaidRate: form.hourlyPaidRate,
          img: form.img,
          nrc: form.nrc,
          dateOfBirth: form.dateOfBirth,
          education: form.education,
          department: form.department,
        }),
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.meta.success) {
            setForm({
              fullname: "",
              email: "",
              password: "",
              confirmPassword: "",
              hourlyPaidRate: "",
              role: STAFF_ID,
            });
            setOpenModel(false);
            window.alert("Success");
            empFetcher();
          } else {
            setForm({
              fullname: "",
              email: "",
              password: "",
              confirmPassword: "",
              hourlyPaidRate: "",
              role: STAFF_ID,
            });
            setOpenModel(false);
            window.alert("Something went wrong!");
          }
        })
        .catch((err) => {
          setForm({
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            hourlyPaidRate: "",
            role: STAFF_ID,
          });
          setOpenModel(false);
          window.alert("Something went wrong!");
        });
    }
  };

  useEffect(() => {
    roleFetcher();
    empFetcher();
  }, []);

  return (
    <Layout>
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/employee">
          <div className="font-semibold text-xs text-gray-400 uppercase">
            <span>Employees</span>
            <span className="px-1">/</span>
            <span className="text-gray-500">List</span>
          </div>
        </Link>

        <button
          className="outline-none px-4 py-2 rounded-lg bg-primary"
          onClick={() => setOpenModel(true)}
        >
          <p className="font-semibold text-white text-sm">
            Create New Employee
          </p>
        </button>
      </div>
      <div className="w-full pt-4 px-4 grid grid-cols-12 gap-4">
        {empList
          ? empList.map((i, k) => {
              return (
                <div
                  key={k}
                  className="col-span-3 flex flex-col items-center border border-gray-200 rounded-lg"
                >
                  <div className="w-full flex flex-col items-center">
                    <img
                      src={i.img}
                      alt=""
                      className="w-20 h-20 rounded-full overflow-hidden mt-4"
                    />
                    <div className="my-4 flex flex-col items-center">
                      <p className="text-md font-semibold">{i.fullname}</p>
                      <p className="text-sm font-semibold text-gray-400">
                        {i.email}
                      </p>
                      <p className="text-sm font-semibold text-gray-400">
                        ${i.hourlyPaidRate} Per Hour
                      </p>
                      <p className="text-sm font-semibold text-gray-400">
                        <Moment date={i.createdAt} format="YYYY-MM-DD" />
                      </p>
                    </div>
                    <div className="flex w-full mb-2 mt-2">
                      <Link
                        to={{
                          pathname: `/employee/detail`,
                          state: {
                            id: i._id,
                            fullname: i.fullname,
                          },
                        }}
                        className="w-full mx-2 bg-primary text-white py-2 rounded-lg text-center"
                      >
                        <p className="font-semibold text-white text-sm">
                          Detail
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : "loading..."}
      </div>
      <div
        className={`${
          openModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm`}
      >
        <div className="border px-4 py-4 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-black text-lg font-bold mb-6 text-center">
            Create New Employee
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Name"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.fullname}
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="password"
              placeholder="Password"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Hourly Paid Rate"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.hourlyPaidRate}
              onChange={(e) =>
                setForm({ ...form, hourlyPaidRate: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="NRC"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.nrc}
              onChange={(e) => setForm({ ...form, nrc: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="date"
              placeholder="Date Of Bitrh"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.dateOfBirth}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Education"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              {role ? (
                role.map((item, key) => {
                  return (
                    <option key={key} value={item._id}>
                      {item.role}
                    </option>
                  );
                })
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <input
              type="text"
              placeholder="Department"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-4">
            <CloudinaryUploadWidget urlDetector={imageAdder} />
          </div>

          <div className="flex justify-end items-center mt-6 mb-2">
            <button
              className="outline-none text-sm text-red-700 rounded-md w-32 px-4 py-2"
              onClick={() => {
                setForm({
                  fullname: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  hourlyPaidRate: "",
                  role: STAFF_ID,
                });
                setOpenModel(false);
              }}
            >
              <p className="text-sm font-semibold">Cancel</p>
            </button>
            <button
              className="outline-none text-sm bg-primary text-white rounded-md w-32 px-4 py-2"
              onClick={empCreator}
            >
              <p className="text-sm font-semibold">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
