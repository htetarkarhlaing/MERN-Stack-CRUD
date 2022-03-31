import React, { useState } from "react";
import axios from "axios";

const Device = () => {
  //instances
  const URL = process.env.REACT_APP_URL;

  //states
  const [type, setType] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [form, setFrom] = useState({
    email: "",
    password: "",
  });

  //handlers
  const loginHandler = async () => {
    await axios
      .post(`${URL}/api/devices/check-status`, {
        email: form.email,
        password: form.password,
        deviceId: localStorage.getItem("deviceId"),
      })
      .then((resJson) => {
        if (resJson.data.meta.success) {
          localStorage.setItem("att", resJson.data.data._id);
          setType(resJson.data.meta.message);
          window.alert("login success!");
          setOpenModel(false);
        } else {
          setFrom({
            ...form,
            email: "",
            password: "",
          });
          window.alert(resJson.meta.message);
        }
      })
      .catch((err) => {
        setFrom({
          ...form,
          email: "",
          password: "",
        });
        window.alert("err");
      });
  };

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const checker = async () => {
    await axios
      .post(`${URL}/api/devices/${type}`, {
        id: localStorage.getItem("att"),
        checkInTime: new Date(),
        checkOutTime: new Date(),
        leave: true,
      })
      .then((resJson) => {
        if (resJson.data.meta.success) {
          setType(resJson.data.meta.message);
          window.alert("Action success!");
        } else {
          window.alert("Action Failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Action Failed!");
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
      <div className="relative w-1/4 h-full">
        <button
          className="absolute right-5 top-5 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"
          onClick={logoutHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>

        <span
          className="absolute left-5 top-5 flex items-center justify-center px-4 cursor-pointer h-10 rounded-full bg-gray-200"
          onClick={() => setOpenModel(true)}
        >
          {type || "Please Login"}
        </span>

        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-full flex my-5">
            <button
              className={`${
                type === "checkin" ? "bg-blue-700 text-white " : "bg-blue-200"
              } w-full mx-1 rounded-lg`}
              onClick={() => {
                if (type === "leave") {
                  setType("checkin");
                }
              }}
            >
              Checkin
            </button>
            <button
              className={`${
                type === "checkout"
                  ? "bg-green-600 text-white "
                  : "bg-green-200"
              } w-full mx-1 rounded-lg`}
            >
              Checkout
            </button>
          </div>
          <div className="mb-4">
            <span>Please login to continue!</span>
          </div>
          {type === "checkin" ? (
            <button
              className="border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white"
              onClick={() => {
                if (type === "checkin") {
                  checker();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </button>
          ) : type === "checkout" ? (
            <button
              className="border border-green-700 text-green-700 rounded-full hover:bg-green-700 hover:text-white"
              onClick={() => {
                if (type === "checkout") {
                  checker();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          ) : (
            <button
              className="border border-red-700 text-red-700 rounded-full hover:bg-red-700 hover:text-white"
              onClick={() => setOpenModel(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div
        className={`${
          openModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center`}
      >
        <div>
          <h1 className="text-white text-xl mb-4 text-center">
            Login to continue
          </h1>
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
            className="block uppercase outline-none bg-blue-700 text-white rounded-md w-64 h-10 px-2 py-1 mb-2"
            onClick={loginHandler}
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
    </div>
  );
};

export default Device;
