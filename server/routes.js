const routes = require("express").Router();
const { account, role, device, task, payroll } = require("./controllers");

routes.get("/", (req, res) => {
  res.send("Hello World");
});

// account
routes.get("/api/accounts", account.accountFetcher);
routes.get("/api/dashbaord", account.profileDataFetcher);
routes.get("/api/accounts/staff", account.staffFetcher);
routes.get("/api/accounts/detail/:id", account.accountDetailFetcher);
routes.put("/api/accounts/update", account.accountUpdater);
routes.post("/api/accounts/create", account.accountInserter);
routes.post("/api/accounts/login", account.accountLogin);

//roles
routes.get("/api/roles", role.roleFetcher);
routes.post("/api/roles/create", role.roleInserter);

//devices
routes.get("/api/devices", device.deviceFetcher);
routes.get("/api/attendence", device.attendanceFetcher);
routes.post("/api/devices/create", device.deviceInserter);
routes.delete("/api/devices/delete", device.deviceDeleter);
routes.post("/api/devices/login", device.deviceLogin);
routes.post("/api/devices/checkin", device.accountCheckin);
routes.post("/api/devices/checkout", device.accountCheckout);
routes.post("/api/devices/leave", device.accountLeave);
routes.post("/api/devices/check-status", device.checkInStatusChcker);

//task
routes.get("/api/tasks", task.taskListFetcher);
routes.get("/api/tasks/:id", task.taskListFetchByUserId);
routes.post("/api/tasks/create", task.taskInserter);
routes.put("/api/tasks/update", task.taskUpdater);

//payroll
routes.get("/api/payroll/", payroll.payrollListFetcher);
routes.post("/api/payroll/caculate", payroll.payrollCreator);

module.exports = routes;
