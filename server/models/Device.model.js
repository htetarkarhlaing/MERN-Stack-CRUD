const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    passCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Device", deviceSchema);
