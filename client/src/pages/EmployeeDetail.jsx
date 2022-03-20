import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useLocation, Link } from "react-router-dom";

const EmployeeDetail = () => {
  const location = useLocation();
  const [empInfo, setEmpInfo] = useState();

  console.log(location.state.id);

  const empDetailFetcher = async () => {
    //instances
    const URL = process.env.REACT_APP_URL;
    await fetch(`${URL}/api/accounts/detail/62377cb09f05175d799a2a8f`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.meta.success) {
          setEmpInfo(resJson.data);
        } else {
          setEmpInfo();
        }
      })
      .catch((err) => {
        setEmpInfo();
      });
  };

  useEffect(() => {
    empDetailFetcher();
  }, []);

  console.log(empInfo);

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
          src={`${
            (empInfo && empInfo.img) || "https://via.placeholder.com/200"
          }`}
          alt="User Info"
          className="w-64 h-64 mx-4 mt-4 rounded-lg"
        />
        <div className="mt-4">
          <div className="grid grid-cols-12 w-96">
            <div className="col-span-4">Name :</div>
            <div className="col-span-8">{empInfo && empInfo.fullname}</div>

            <div className="col-span-4">Eamil :</div>
            <div className="col-span-8">{empInfo && empInfo.email}</div>

            <div className="col-span-4">NRC :</div>
            <div className="col-span-8">{empInfo && empInfo.nrc}</div>

            <div className="col-span-4">DOB :</div>
            <div className="col-span-8">{empInfo && empInfo.dateOfBirth}</div>

            <div className="col-span-4">Education :</div>
            <div className="col-span-8">{empInfo && empInfo.education}</div>

            <div className="col-span-4">Department :</div>
            <div className="col-span-8">{empInfo && empInfo.department}</div>

            <div className="col-span-4">Role :</div>
            <div className="col-span-8">{empInfo && empInfo.role.role}</div>
          </div>
          <div className="mt-4">
            <button
              className="outline-none px-4 py-1 w-32 bg-red-500 text-white rounded-lg"
              //   onClick={() => setOpenModel(true)}
            >
              Delete
            </button>{" "}
            <button
              className="outline-none px-4 py-1 w-32 bg-gray-200 rounded-lg"
              //   onClick={() => setOpenModel(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
