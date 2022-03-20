const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    title: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    remark: {
      type: Schema.Types.String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
