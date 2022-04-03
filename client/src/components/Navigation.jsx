import React from "react";
import { Link } from "react-router-dom";

//instances
const URL = process.env.REACT_APP_URL;

const Navigation = ({ leave }) => {
  const leaveHandler = async () => {
    await fetch(`${URL}/api/devices/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success) {
          window.alert("success");
        } else {
          window.alert("failed");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("err");
      });
  };

  return (
    <div className="w-full h-16 bg-primary flex items-center px-10 justify-between">
      <Link to="/">
        <div>
          <p className="text-white font-bold">EMP-MGN</p>
        </div>
      </Link>
      <div className="flex gap-4">
        {leave ? (
          <button onClick={leaveHandler}>
            <p className="text-sm text-white font-semibold">leave</p>
          </button>
        ) : (
          ""
        )}

        <Link
          to={{
            pathname: `/profile`,
            state: {
              id: localStorage.getItem("uid"),
              // fullname: localStorage.getItem("fullname"),
            },
          }}
        >
          <span className="text-sm text-white font-semibold">Profile</span>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <p className="text-sm text-white font-semibold">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
