import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Moment from "react-moment";
import "moment-timezone";

const DevicePage = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [openModel, setOpenModel] = useState(false);
  const [count, setCount] = useState(0);
  const [deviceList, setDeviceList] = useState();
  const [form, setForm] = useState({
    deviceId: "",
    passcode: "",
  });

  const deviceListFetcher = async () => {
    await fetch(`${URL}/api/devices`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setDeviceList(resJson.data);
        } else {
          setDeviceList([]);
        }
      })
      .catch((err) => {
        setDeviceList([]);
      });
  };

  const deviceCreator = async () => {
    await fetch(`${URL}/api/devices/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceId: form.deviceId,
        passCode: form.passcode,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          setForm({
            deviceId: "",
            passCode: "",
          });
          setOpenModel(false);
          window.alert("Success");
          deviceListFetcher();
        } else {
          setForm({
            deviceId: "",
            passCode: "",
          });
          setOpenModel(false);
          window.alert("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
        setForm({
          deviceId: "",
          passCode: "",
        });
        setOpenModel(false);
        window.alert("Something went wrong!");
      });
  };

  const deviceDeleter = async (id) => {
    await fetch(`${URL}/api/devices/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          window.alert("Success");
          deviceListFetcher();
        } else {
          window.alert("Failed");
        }
      })
      .catch((err) => {
        window.alert("Failed");
      });
  };

  useEffect(() => {
    deviceListFetcher();
  }, []);

  useEffect(() => {
    console.log("useeffect count", count);
  }, []);

  console.log("count", count);

  return (
    <Layout>
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/device-page">
          <div className="pt-4 mb-6 font-semibold text-xs text-gray-400 uppercase">
            <span>Devices</span>
            <span className="px-1">/</span>
            <span className="text-gray-500">List</span>
          </div>
        </Link>

        <button
          className="outline-none px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Create New Device
        </button>
      </div>
      <div className="w-full pt-4 px-4 grid grid-cols-12 gap-4">
        {deviceList
          ? deviceList.map((i, k) => {
              return (
                <div
                  key={k}
                  className="col-span-3 flex flex-col items-center bg-gray-100 rounded-lg"
                >
                  <div className="w-full flex flex-col items-center">
                    <span className="block text-lg text-gray-600 mt-2">
                      Device ID: {i.deviceId}
                    </span>
                    <span className="block text-sm text-gray-400">
                      PassCode: {i.passCode}
                    </span>
                    <span className="block text-sm text-gray-400">
                      <Moment date={i.createdAt} format="YYYY-MM-DD" />
                    </span>
                    <div className="flex w-full mb-2 mt-2">
                      <button
                        className="w-full mx-2 bg-red-500 text-white py-1 rounded-md px-1"
                        onClick={() => deviceDeleter(i._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : "loading..."}
      </div>

      {/* model */}
      <div
        className={`${
          openModel ? "block" : "hidden"
        } absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm`}
      >
        <div className="border px-4 py-4 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-black text-xl mb-4 text-center">
            Create New Device
          </h1>
          <input
            type="text"
            placeholder="Device ID"
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.deviceId}
            onChange={(e) => setForm({ ...form, deviceId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Passcode"
            className="block outline-none border border-gray-400 rounded-md w-64 h-10 px-2 py-1 mb-2"
            value={form.passcode}
            onChange={(e) => setForm({ ...form, passcode: e.target.value })}
          />

          <div className="flex justify-end items-center mt-6 mb-2">
            <button
              className="outline-none text-sm text-red-700 rounded-md w-32 px-4 py-2"
              onClick={() => {
                setForm({
                  deviceId: "",
                  passcode: "",
                });
                setOpenModel(false);
              }}
            >
              <p className="text-sm font-semibold">Cancel</p>
            </button>
            <button
              className="outline-none text-sm bg-primary text-white rounded-md w-32 px-4 py-2"
              onClick={deviceCreator}
            >
              <p className="text-sm font-semibold">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevicePage;
