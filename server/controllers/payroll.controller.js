const { Payroll, Attendance, Account } = require("../models");
const moment = require("moment");

// Get method for Roles
const payrollListFetcher = async (req, res) => {
  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    const payrollData = await Payroll.find({
      createdAt: { $gte: startOfToday },
    }).populate("empId");
    return res.status(200).json({
      meta: {
        success: true,
        length: payrollData.length,
      },
      data: payrollData,
      self: req.originalUrl,
    });
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
      },
      self: req.originalUrl,
    });
  }
};

const payrollListFetcherByRange = async (req, res) => {
  let start = new Date(req.params.start);
  let startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  let end = new Date(req.params.end);
  let endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  try {
    const payrollData = await Payroll.find({
      createdAt: { $gt: startDate, $lt: endDate },
    }).populate("empId");
    return res.status(200).json({
      meta: {
        success: true,
        length: payrollData.length,
      },
      data: payrollData,
      self: req.originalUrl,
    });
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
      },
      self: req.originalUrl,
    });
  }
};

const payrollListFetcherByEmp = async (req, res) => {
  let date = new Date();
  let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  try {
    const payrollData = await Payroll.find({
      empId: req.params.emp,
      createdAt: { $gt: currentMonth },
    }).populate("empId");
    return res.status(200).json({
      meta: {
        success: true,
        length: payrollData.length,
      },
      data: payrollData,
      self: req.originalUrl,
    });
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
      },
      self: req.originalUrl,
    });
  }
};

// Post method for Roles
const payrollCreator = async (req, res) => {
  try {
    const totalAttendence = await Attendance.find({
      accountId: req.body.empId,
    });
    const empdata = await Account.findById(req.body.empId);

    if (totalAttendence.length > 0) {
      let totalWorkingHour = 0;
      await totalAttendence.filter((att) => {
        let startDate = moment(att.checkInTime);
        let endDate = moment(att.checkOutTime);
        totalWorkingHour = totalWorkingHour + endDate.diff(startDate, "hours");
      });
      const newPayroll = new Payroll({
        empId: req.body.empId,
        totalWorkingHour: totalWorkingHour,
        hourlyPayRate: empdata.hourlyPaidRate,
        totalAmount: totalWorkingHour * empdata.hourlyPaidRate + req.body.bonus,
        bonus: req.body.bonus,
        date: new Date(),
        status: "pending",
      });
      const payroll = await newPayroll.save();
      return res.status(200).json({
        meta: {
          success: true,
        },
        data: payroll,
        self: req.originalUrl,
      });
    } else {
      const newPayroll = new Payroll({
        empId: req.body.empId,
        totalWorkingHour: 0,
        bonus: req.body.bonus,
        date: new Date(),
        status: "pending",
      });
      const payroll = await newPayroll.save();
      return res.status(200).json({
        meta: {
          success: true,
        },
        data: payroll,
        self: req.originalUrl,
      });
    }
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
        message: err,
      },
      self: req.originalUrl,
    });
  }
};

module.exports = {
  payrollListFetcher,
  payrollCreator,
  payrollListFetcherByRange,
  payrollListFetcherByEmp,
};
