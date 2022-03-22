import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Moment from "react-moment";
import "moment-timezone";

const DevicePage = () => {
  //instances
  const URL = process.env.REACT_APP_URL;
  const [openModel, setOpenModel] = useState(false);
  const [empList, setEmpList] = useState();

  const deviceListFetcher = async () => {
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

  useEffect(() => {
    deviceListFetcher();
  }, []);

  return (
    <Layout>
      <div className="w-full h-10 mt-2 px-4 flex justify-between items-center">
        <Link to="/employee">
          <div className="font-bold text-sm text-gray-400 uppercase">
            <span>Employees</span>
            <span className="px-1">/</span>
            <span className="text-gray-500">List</span>
          </div>
        </Link>

        <button
          className="outline-none px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => setOpenModel(true)}
        >
          Create New Employee
        </button>
      </div>
      <div className="w-full pt-4 px-4 grid grid-cols-12 gap-4">
        {empList
          ? empList.map((i, k) => {
              return (
                <div
                  key={k}
                  className="col-span-3 flex flex-col items-center bg-gray-100 rounded-lg"
                >
                  <div className="w-full flex flex-col items-center">
                    <img
                      src={i.img}
                      alt=""
                      className="w-20 h-20 rounded-full overflow-hidden mt-4"
                    />
                    <span className="block text-lg">{i.fullname}</span>
                    <span className="block text-sm text-gray-400">
                      {i.email}
                    </span>
                    <span className="block text-sm text-gray-400">
                      ${i.hourlyPaidRate} Per Hour
                    </span>
                    <span className="block text-sm text-gray-400">
                      <Moment date={i.createdAt} format="YYYY-MM-DD" />
                    </span>
                    <div className="flex w-full mb-2 mt-2">
                      <Link
                        to={{
                          pathname: `/employee/detail`,
                          state: {
                            id: i._id,
                            fullname: i.fullname,
                          },
                        }}
                        className="w-full mx-2 bg-blue-500 text-white py-1 rounded-md px-1"
                      >
                        <button className="w-full">Edit</button>
                      </Link>
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
