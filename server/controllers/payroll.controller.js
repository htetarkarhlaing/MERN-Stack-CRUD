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

module.exports = { payrollListFetcher, payrollCreator };
