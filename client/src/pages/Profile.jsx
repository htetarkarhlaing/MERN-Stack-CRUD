/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useLocation, Link } from "react-router-dom";
import CloudinaryUploadWidget from "../components/CloudinaryWidget";

const Profile = () => {
  const URL = process.env.REACT_APP_URL;
  const location = useLocation();
  const [openModel, setOpenModel] = useState(false);
  const [openPasswordModel, setOpenPasswordModel] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    img: "",
    nrc: "",
    dateOfBirth: "",
    education: "",
    role: "",
  });

  const [credential, setCredential] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
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

            img: resJson.data.img,
            nrc: resJson.data.nrc,

            dateOfBirth: resJson.data.dateOfBirth,
            education: resJson.data.education,
            role: resJson.data.role.role,
          });
        } else {
          setForm({
            fullname: "",
            email: "",
            img: "",
            nrc: "",
            dateOfBirth: "",
            education: "",
          });
        }
      })
      .catch((err) => {
        setForm({
          fullname: "",
          email: "",
          img: "",
          nrc: "",
          dateOfBirth: "",
          education: "",
        });
      });
  };

  useEffect(() => {
    empDetailFetcher();
  }, [location.state.id]);

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
        img: form.img,
        nrc: form.nrc,
        dateOfBirth: form.dateOfBirth,
        education: form.education,
        id: location.state.id,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          window.alert("Account updated successfully");
          window.location.href = "/profile";
        } else {
          window.alert("Account updated failed");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("somthing went wrong");
      });
  };

  const accountPasswordReset = async () => {
    if (credential.newPassword === credential.confirmNewPassword) {
      await fetch(`${URL}/api/accounts/password-update/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: location.state.id,
          password: credential.password,
          newPassword: credential.newPassword,
        }),
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.meta.success) {
            window.alert("Account updated successfully");
            localStorage.clear();
            window.location.href = "/";
          } else {
            window.alert("Account updated failed");
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert("somthing went wrong");
        });
    } else {
      window.alert("Password did not match.");
    }
  };

  return (
    <Layout>
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/employee">
          <div className="font-bold text-sm text-gray-400 uppercase">
            <span>Admin</span>
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

            <div className="col-span-4">Role :</div>
            <div className="col-span-8">
              {form && form.role ? form.role : ""}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="outline-none px-4 py-1 w-46 bg-red-500 text-white rounded-lg"
              onClick={() => {
                setOpenPasswordModel(true);
              }}
            >
              Change Password
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
            Edit Detail
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
              type="text"
              placeholder="NRC"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.nrc}
              onChange={(e) => setForm({ ...form, nrc: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date Of Bitrh"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.dateOfBirth}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Education"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
            />
            <CloudinaryUploadWidget urlDetector={imageAdder} />
          </div>

          <div className="flex justify-end items-center mt-6 mb-2">
            <button
              className="outline-none text-sm text-red-700 rounded-md w-32 px-4 py-2"
              onClick={() => {
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

      <div
        className={`${
          openPasswordModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm`}
      >
        <div className="border px-4 py-4 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-black text-lg font-bold mb-6 text-center">
            Change Password
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="password"
              placeholder="current Password"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={credential.password}
              onChange={(e) =>
                setCredential({ ...credential, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={credential.newPassword}
              onChange={(e) =>
                setCredential({ ...credential, newPassword: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="password"
              placeholder="Confirm New Password"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={credential.confirmNewPassword}
              onChange={(e) =>
                setCredential({
                  ...credential,
                  confirmNewPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end items-center mt-6 mb-2">
            <button
              className="outline-none text-sm text-red-700 rounded-md w-32 px-4 py-2"
              onClick={() => {
                setOpenPasswordModel(false);
              }}
            >
              <p className="text-sm font-semibold">Cancel</p>
            </button>
            <button
              className="outline-none text-sm bg-primary text-white rounded-md w-32 px-4 py-2"
              onClick={accountPasswordReset}
            >
              <p className="text-sm font-semibold">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
