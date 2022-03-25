const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payrollSchema = new Schema(
  {
    empId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    totalWorkingHour: {
      type: Schema.Types.Number,
    },
    hourlyPayRate: {
      type: Schema.Types.Number,
    },
    bonus: {
      type: Schema.Types.Number,
    },
    totalAmount: {
      type: Schema.Types.Number,
    },
    date: {
      type: Schema.Types.Date,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payroll", payrollSchema);
