const jwt = require("jsonwebtoken");
const { Device, Attendance, Account } = require("../models");

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

const deviceDeleter = async (req, res) => {
  try {
    const fetchedDevice = await Device.findByIdAndDelete(req.body.id);
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
  try {
    const updateAtt = await Attendance.findByIdAndUpdate(req.body.id, {
      checkInTime: req.body.checkInTime,
    });
    return res.status(200).json({
      meta: {
        success: true,
        message: "checkout",
      },
      data: updateAtt,
      self: req.originalUrl,
    });
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
        message: "Something went wrong.",
      },
      self: req.originalUrl,
    });
  }
};

const accountCheckout = async (req, res) => {
  try {
    const updateAtt = await Attendance.findByIdAndUpdate(req.body.id, {
      checkOutTime: req.body.checkOutTime,
    });
    return res.status(200).json({
      meta: {
        success: true,
        message: "success",
      },
      data: updateAtt,
      self: req.originalUrl,
    });
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
        message: "Something went wrong.",
      },
      self: req.originalUrl,
    });
  }
};

const accountLeave = async (req, res) => {
  try {
    const updateAtt = await Attendance.findByIdAndUpdate(req.body.id, {
      leave: true,
    });
    return res.status(200).json({
      meta: {
        success: true,
        message: "leaved",
      },
      data: updateAtt,
      self: req.originalUrl,
    });
  } catch (err) {
    return res.status(500).json({
      meta: {
        success: false,
        message: "Something went wrong.",
      },
      self: req.originalUrl,
    });
  }
};

const checkInStatusChcker = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    Account.findOne({ email })
      .populate("role", "-__v")
      .exec(async (err, acc) => {
        if (err) {
          return res.status(500).json({
            meta: {
              success: false,
              message: "Server error.[!device verify]",
            },
            self: req.originalUrl,
          });
        }
        if (!acc) {
          return res.status(404).json({
            meta: {
              success: false,
              message: "There is no account.",
            },
            self: req.originalUrl,
          });
        } else {
          if (password === acc.password) {
            const attendanceDetail = await Attendance.find({
              accountId: acc._id,
              checkInTime: { $gte: startOfToday },
            });
            if (attendanceDetail.length > 0) {
              return res.status(200).json({
                meta: {
                  success: true,
                  message: "checkout",
                },
                data: attendanceDetail,
                self: req.originalUrl,
              });
            } else {
              const newAttendance = new Attendance({
                deviceId: req.body.deviceId,
                accountId: acc._id,
              });
              const attendanceModel = await newAttendance.save();
              return res.status(200).json({
                meta: {
                  success: true,
                  message: "checkin",
                },
                data: attendanceModel,
                self: req.originalUrl,
              });
            }
          } else {
            return res.status(403).json({
              meta: {
                success: false,
                message:
                  "The passcode that you enter is not match with device id.",
              },
              self: req.originalUrl,
            });
          }
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

const attendanceFetcher = async (req, res) => {
  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    const payrollData = await Attendance.find({
      createdAt: { $gte: startOfToday },
    })
      .populate("accountId", "-__v")
      .populate("deviceId");
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
        message: err,
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
  accountLeave,
  checkInStatusChcker,
  deviceDeleter,
  attendanceFetcher,
};
