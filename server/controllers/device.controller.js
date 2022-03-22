const jwt = require("jsonwebtoken");
const { Device, Attendance } = require("../models");

const deviceFetcher = async (req, res) => {
  try {
    const fetchedDevice = await Device.find();
    return res.status(200).json({
      meta: {
        success: true,
        length: fetchedDevice.length,
      },
      data: fetchedDevice,
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

const deviceInserter = async (req, res) => {
  const deviceAdder = new Device({
    deviceId: req.body.deviceId,
    passCode: req.body.passCode,
  });
  try {
    const insertDevice = await deviceAdder.save();
    return res.status(201).json({
      meta: {
        success: true,
      },
      data: insertDevice,
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

const deviceLogin = (req, res) => {
  const deviceId = req.body.deviceId;
  const passCode = req.body.passCode;

  Device.findOne({ deviceId }).exec((err, devc) => {
    if (err) {
      return res.status(500).json({
        meta: {
          success: false,
          message: "Server error.[!device verify]",
        },
        self: req.originalUrl,
      });
    }
    if (!devc) {
      return res.status(404).json({
        meta: {
          success: false,
          message: "There is no device with this id.",
        },
        self: req.originalUrl,
      });
    } else {
      if (passCode === devc.passCode) {
        const token = jwt.sign({ _id: devc._id }, process.env.TOKEN_SECRET, {
          expiresIn: "7d",
        });
        const { _id, deviceId } = devc;
        return res.status(200).json({
          meta: {
            success: true,
            message: "login-success",
          },
          data: {
            token: token,
            device: {
              _id,
              deviceId,
            },
          },
        });
      } else {
        return res.status(403).json({
          meta: {
            success: false,
            message: "The passcode that you enter is not match with device id.",
          },
          self: req.originalUrl,
        });
      }
    }
  });
};

const accountCheckin = async (req, res) => {
  const checkin = new Attendance({
    deviceId: req.body.deviceId,
    accountId: req.body.accountId,
    checkInTime: req.body.checkInTime,
    isLeave: false,
  });

  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    Attendance.find({
      accountId: req.body.accountId,
      checkInTime: { $gte: startOfToday },
    }).exec((err, att) => {
      console.log(att);
      if (err) {
        console.log(err);
        return res.status(500).json({
          meta: {
            success: false,
          },
          self: req.originalUrl,
        });
      }
      if (att.length > 0) {
        return res.status(400).json({
          meta: {
            success: false,
            message: "Already checked in.",
          },
          self: req.originalUrl,
        });
      } else {
        const checked = checkin.save();
        return res.status(201).json({
          meta: {
            success: true,
          },
          data: checked,
          self: req.originalUrl,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      meta: {
        success: false,
      },
      self: req.originalUrl,
    });
  }
};

const accountCheckout = async (req, res) => {
  const checkin = new Attendance({
    deviceId: req.body.deviceId,
    accountId: req.body.accountId,
    checkInTime: req.body.checkInTime,
    isLeave: false,
  });

  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    Attendance.find({
      accountId: req.body.accountId,
      checkInTime: { $gte: startOfToday },
    }).exec((err, att) => {
      console.log(att);
      if (err) {
        console.log(err);
        return res.status(500).json({
          meta: {
            success: false,
          },
          self: req.originalUrl,
        });
      }
      if (att.length > 0) {
        return res.status(400).json({
          meta: {
            success: false,
            message: "Already checked in.",
          },
          self: req.originalUrl,
        });
      } else {
        const checked = checkin.save();
        return res.status(201).json({
          meta: {
            success: true,
          },
          data: checked,
          self: req.originalUrl,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      meta: {
        success: false,
      },
      self: req.originalUrl,
    });
  }
};

const checkInStatusChcker = async () => {
  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    const attendanceDetail = await Attendance.find({
      accountId: req.body.accountId,
      checkInTime: { $gte: startOfToday },
    });
    return res.status(200).json({
      meta: {
        success: true,
        message: attendanceDetail,
      },
      self: req.originalUrl,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      meta: {
        success: false,
      },
      self: req.originalUrl,
    });
  }
};

module.exports = {
  deviceFetcher,
  deviceInserter,
  deviceLogin,
  accountCheckin,
  accountCheckout,
  checkInStatusChcker,
};
