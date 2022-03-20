const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hourlyPaidRate: {
      type: Schema.Types.Number,
    },
    img: {
      type: String,
    },
    nrc: {
      type: String,
    },
    department: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    education: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
