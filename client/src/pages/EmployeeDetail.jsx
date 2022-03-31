/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useLocation, Link } from "react-router-dom";
import CloudinaryUploadWidget from "../components/CloudinaryWidget";

const EmployeeDetail = () => {
  const URL = process.env.REACT_APP_URL;
  const location = useLocation();
  const [openModel, setOpenModel] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    hourlyPaidRate: "",
    img: "",
    nrc: "",
    department: "",
    dateOfBirth: "",
    education: "",
    role: "",
  });

  const empDetailFetcher = async () => {
    //instances

    await fetch(`${URL}/api/accounts/detail/${location.state.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.meta.success) {
          setForm({
            fullname: resJson.data.fullname,
            email: resJson.data.email,
            hourlyPaidRate: resJson.data.hourlyPaidRate,
            img: resJson.data.img,
            nrc: resJson.data.nrc,
            department: resJson.data.department,
            dateOfBirth: resJson.data.dateOfBirth,
            education: resJson.data.education,
            role: resJson.data.role.role,
          });
        } else {
          setForm({
            fullname: "",
            email: "",
            hourlyPaidRate: "",
            img: "",
            nrc: "",
            department: "",
            dateOfBirth: "",
            education: "",
          });
        }
      })
      .catch((err) => {
        setForm({
          fullname: "",
          email: "",
          hourlyPaidRate: "",
          img: "",
          nrc: "",
          department: "",
          dateOfBirth: "",
          education: "",
        });
      });
  };

  useEffect(() => {
    empDetailFetcher();
  }, [location.state.id]);

  const accountDeleter = async () => {
    await fetch(`${URL}/api/accounts/delete/${location.state.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          window.alert("Account deleted successfully");
          window.location.href = "/employee";
        } else {
          window.alert("Account deleted failed");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("somthing went wrong");
      });
  };

  const imageAdder = (url) => {
    setForm({
      ...form,
      img: url,
    });
  };

  const empEditor = async () => {
    await fetch(`${URL}/api/accounts/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: form.fullname,
        email: form.email,
        hourlyPaidRate: form.hourlyPaidRate,
        img: form.img,
        nrc: form.nrc,
        department: form.department,
        dateOfBirth: form.dateOfBirth,
        education: form.education,
        id: location.state.id,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          window.alert("Account updated successfully");
          window.location.href = "/employee";
        } else {
          window.alert("Account updated failed");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("somthing went wrong");
      });
  };

  return (
    <Layout>
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/employee">
          <div className="font-bold text-sm text-gray-400 uppercase">
            <span>Employees</span>
            <span className="px-1">/</span>
            <span className="text-gray-500">{location.state.fullname}</span>
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center">
        <img
          src={`${(form && form.img) || "https://via.placeholder.com/200"}`}
          alt="User Info"
          className="w-64 h-64 mx-4 mt-4 rounded-lg"
        />
        <div className="mt-4">
          <div className="grid grid-cols-12 w-96">
            <div className="col-span-4">Name :</div>
            <div className="col-span-8">
              {form && form.fullname ? form.fullname : ""}
            </div>

            <div className="col-span-4">Eamil :</div>
            <div className="col-span-8">
              {form && form.email ? form.email : ""}
            </div>

            <div className="col-span-4">NRC :</div>
            <div className="col-span-8">{form && form.nrc ? form.nrc : ""}</div>

            <div className="col-span-4">DOB :</div>
            <div className="col-span-8">
              {form && form.dateOfBirth ? form.dateOfBirth : ""}
            </div>

            <div className="col-span-4">Education :</div>
            <div className="col-span-8">
              {form && form.education ? form.education : ""}
            </div>

            <div className="col-span-4">Department :</div>
            <div className="col-span-8">
              {form && form.department ? form.department : ""}
            </div>

            <div className="col-span-4">Role :</div>
            <div className="col-span-8">
              {form && form.role ? form.role : ""}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="outline-none px-4 py-1 w-32 bg-red-500 text-white rounded-lg"
              onClick={accountDeleter}
            >
              Delete
            </button>{" "}
            <button
              className="outline-none px-4 py-1 w-32 bg-gray-200 rounded-lg"
              onClick={() => setOpenModel(true)}
            >
              Edit
            </button>
          </div>
        </div>
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
                  role: "623706512618ba2b199a9169",
                });
                setOpenModel(false);
              }}
            >
              <p className="text-sm font-semibold">Cancel</p>
            </button>
            <button
              className="outline-none text-sm bg-primary text-white rounded-md w-32 px-4 py-2"
              onClick={empEditor}
            >
              <p className="text-sm font-semibold">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
