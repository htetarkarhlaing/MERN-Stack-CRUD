const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    checkInTime: {
      type: Schema.Types.Date,
    },
    checkOutTime: {
      type: Schema.Types.Date,
    },
    isLeave: {
      type: Schema.Types.Boolean,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
