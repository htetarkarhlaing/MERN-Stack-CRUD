import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Moment from "react-moment";
import "moment-timezone";

const DevicePage = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [openModel, setOpenModel] = useState(false);
  const [deviceList, setDeviceList] = useState();

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

  useEffect(() => {
    deviceListFetcher();
  }, []);

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
          onClick={() => setOpenModel(true)}
        >
          Create New Deivice
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
                      <button className="w-full mx-2 bg-red-500 text-white py-1 rounded-md px-1">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : "loading..."}
      </div>
    </Layout>
  );
};

export default DevicePage;
