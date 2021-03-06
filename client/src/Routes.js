import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Payroll from "./pages/Payroll";
import Task from "./pages/Task";
import CheckIn from "./pages/CheckIn";
import Device from "./pages/Device";
import EmployeeDetail from "./pages/EmployeeDetail";
import DevicePage from "./pages/DevicePage";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile"
import EmpProfile from "./pages/EmpProfile";
import Admin from "./pages/Admin";
import AdminDetail from "./pages/AdminDetail";

const Routes = () => {
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const deviceId = localStorage.getItem("deviceId");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setMounted(true);
      setAuthorized(true);
    } else {
      setMounted(true);
      setAuthorized(false);
    }
  }, []);

  return (
    <div>
      {mounted ? (
        authorized ? (
          deviceId ? (
            <DeviceRoute />
          ) : (
            <UserRoutes />
          )
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        )
      ) : (
        <Switch>
          <Route exact path="/" component={Loading} />
        </Switch>
      )}
    </div>
  );
};

const UserRoutes = () => {
  const role = localStorage.getItem("role");
  return (
    <Switch>
      {role === "admin" ? (
        <>
          {" "}
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/employee" component={Employee} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/admin/detail" component={AdminDetail} />
          <Route path="/employee/detail" component={EmployeeDetail} />
          <Route path="/profile" component={Profile} />
          <Route path="/payroll" component={Payroll} />
          <Route path="/attendance" component={CheckIn} />
          <Route path="/task" component={Task} />
          <Route path="/device-page" component={DevicePage} />
        </>
      ) : (
        <>
          {" "}
          <Route exact path="/" component={UserDashboard} />
          <Route path="/profile" component={EmpProfile} />
          {/* <Route path="/employee" component={Employee} />
          <Route path="/payroll" component={Payroll} />
          <Route path="/attendance" component={CheckIn} />
          <Route path="/task" component={Task} /> */}
        </>
      )}
    </Switch>
  );
};

const DeviceRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={Device} />
    </Switch>
  );
};

export default Routes;
