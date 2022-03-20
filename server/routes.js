const routes = require("express").Router();
const { account, role, device, task } = require("./controllers");

routes.get("/", (req, res) => {
  res.send("Hello World");
});

// account
routes.get("/api/accounts", account.accountFetcher);
routes.get("/api/accounts/staff", account.staffFetcher);
routes.get("/api/accounts/detail/:id", account.accountDetailFetcher);
routes.post("/api/accounts/create", account.accountInserter);
routes.post("/api/accounts/login", account.accountLogin);

//roles
routes.get("/api/roles", role.roleFetcher);
routes.post("/api/roles/create", role.roleInserter);

//devices
routes.get("/api/devices", device.deviceFetcher);
routes.post("/api/devices/create", device.deviceInserter);
routes.post("/api/devices/login", device.deviceLogin);
routes.post("/api/devices/checkin", device.accountCheckin);

//task
routes.get("/api/tasks", task.taskListFetcher);
routes.post("/api/tasks/create", task.taskInserter);

module.exports = routes;
