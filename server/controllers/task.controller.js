const { Task } = require("../models");

const taskListFetcher = async (req, res) => {
  try {
    const taskList = await Task.find()
      .populate("assignedTo", "-__v")
      .populate("assignedBy");
    return res.status(200).json({
      meta: {
        success: true,
        length: taskList.length,
      },
      data: taskList,
      self: req.originalUrl,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      meta: {
        success: false,
        message: err,
      },
      self: req.originalUrl,
    });
  }
};

const taskListFetchByUserId = async (req, res) => {
  try {
    const taskList = await Task.find({ assignedTo: req.params.id })
      .populate("assignedTo", "-__v")
      .populate("assignedBy");
    return res.status(200).json({
      meta: {
        success: true,
        length: taskList.length,
      },
      data: taskList,
      self: req.originalUrl,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      meta: {
        success: false,
        message: err,
      },
      self: req.originalUrl,
    });
  }
};

const taskListDetailFetcher = async (req, res) => {
  try {
    const taskList = await Task.findById(req.body.taskId);
    return res.status(200).json({
      meta: {
        success: true,
      },
      data: taskList,
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

const taskInserter = async (req, res) => {
  const taskAdder = new Task({
    assignedTo: req.body.assignedTo,
    assignedBy: req.body.assignedBy,
    title: req.body.title,
    description: req.body.description,
    status: "pending",
  });
  try {
    const task = await taskAdder.save();
    return res.status(201).json({
      meta: {
        success: true,
      },
      data: task,
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

const taskUpdater = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.body.id, {
      status: req.body.status,
      remark: req.body.remark,
    });
    return res.status(200).json({
      meta: {
        success: true,
      },
      data: updatedTask,
      self: req.originalUrl,
    });
  } catch (err) {
    console.log(err);
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
  taskListFetcher,
  taskListDetailFetcher,
  taskInserter,
  taskUpdater,
  taskListFetchByUserId,
};
