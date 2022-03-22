const account = require("./account.controller");
const role = require("./role.controller");
const device = require("./device.controller");
const task = require("./task.controller");
const payroll = require("./payroll.controller");

module.exports = { role, device, account, task, payroll };
