const jwt = require("jsonwebtoken");
const { Account } = require("../models");

const accountFetcher = async (req, res) => {
  try {
    const fetchedDevice = await Account.find();
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

const accountDetailFetcher = async (req, res) => {
  try {
    const fetchedDevice = await Account.findById(req.params.id).populate(
      "role",
      "-__v"
    );
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

const staffFetcher = async (req, res) => {
  try {
    const fetchedDevice = await Account.find({
      role: "623706512618ba2b199a9169",
    }).populate("role", "-__v");
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

const accountInserter = async (req, res) => {
  const accountAdder = new Account({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    fullname: req.body.fullname,
    hourlyPaidRate: req.body.hourlyPaidRate,
    img: req.body.img,
    nrc: req.body.nrc,
    department: req.body.department,
    dateOfBirth: req.body.dateOfBirth,
    education: req.body.education,
    status: "active",
  });
  try {
    const insertAccount = await accountAdder.save();
    return res.status(201).json({
      meta: {
        success: true,
      },
      data: insertAccount,
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

const accountLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Account.findOne({ email })
    .populate("role", "-__v")
    .exec((err, acc) => {
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
          const token = jwt.sign(
            { _id: acc._id, email: acc.email },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "7d",
            }
          );
          const { _id, email, role } = acc;
          return res.status(200).json({
            meta: {
              success: true,
              message: "login-success",
            },
            data: {
              token: token,
              account: {
                _id,
                email,
                role: role.role,
              },
            },
          });
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
};

module.exports = {
  accountFetcher,
  accountInserter,
  staffFetcher,
  accountLogin,
  accountDetailFetcher,
};
