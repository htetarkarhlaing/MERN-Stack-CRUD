import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  //instances
  const URL = process.env.REACT_APP_URL;

  //states
  const [form, setFrom] = useState({
    email: "",
    password: "",
    deviceId: "",
    passCode: "",
  });

  const [isDevice, setIsDevice] = useState(false);

  //handlers
  const loginHandler = async (e) => {
    await axios
      .post(`${URL}/api/${isDevice ? "devices/login" : "accounts/login"}`, {
        email: form.email,
        deviceId: form.deviceId,
        password: form.password,
        passCode: form.passCode,
      })
      // .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.data.meta.success) {
          window.alert("Login success!");
          localStorage.setItem("token", resJson.data.data.token);

          if (resJson.data.data.device) {
            localStorage.setItem("deviceId", resJson.data.data.device._id);
          } else {
            localStorage.setItem("uid", resJson.data.data.account._id || "");
            localStorage.setItem("role", resJson.data.data.account.role || "");
          }
          window.location.href = "/";
        } else {
          setFrom({
            ...form,
            email: "",
            password: "",
            deviceId: "",
            passCode: "",
          });
          window.alert(resJson.meta.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setFrom({
          ...form,
          email: "",
          password: "",
          deviceId: "",
          passCode: "",
        });
        window.alert("err");
      });
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center">
      <div
        className="w-3/4 h-full"
        // to change bg image
        style={{
          backgroundImage: "url('login-bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="w-1/4 flex items-center justify-center flex-col">
        <h1 className="text-xl font-bold uppercase my-3">
          {isDevice ? "Device Login" : "Account Login"}
        </h1>
        {isDevice ? (
          <>
            {" "}
            <input
              type="text"
              placeholder="Device ID"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.deviceId}
              onChange={(e) => setFrom({ ...form, deviceId: e.target.value })}
            />
            <input
              type="password"
              placeholder="Passcode"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.passCode}
              onChange={(e) => setFrom({ ...form, passCode: e.target.value })}
            />
            <button
              className="uppercase outline-none bg-green-500 text-white rounded-md w-64 h-10 px-2 py-1 mb-2"
              onClick={loginHandler}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="abcd@gmail.com"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.email}
              onChange={(e) => setFrom({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
              value={form.password}
              onChange={(e) => setFrom({ ...form, password: e.target.value })}
            />
            <button
              className="outline-none bg-primary text-sm font-semibold text-white rounded-md w-64 h-10 px-2 py-1 mb-2"
              onClick={loginHandler}
            >
              Login
            </button>
          </>
        )}

        <hr className="bg-gray-300 w-full" style={{ height: 1 }} />
        <button
          className="outline-none text-sm text-blue-500 my-2"
          onClick={() => {
            setIsDevice(!isDevice);
          }}
        >
          {isDevice ? "Continue as Account ?" : "Device Login ?"}
        </button>
      </div>
    </div>
  );
}
