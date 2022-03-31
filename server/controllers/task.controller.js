const { Task } = require("../models");

const taskListFetcher = async (req, res) => {
  let now = new Date();
  let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    const taskList = await Task.find({
      createdAt: { $gte: startOfToday },
    })
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

const taskListFetcherByRange = async (req, res) => {
  let start = new Date(req.params.start);
  let startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  let end = new Date(req.params.end);
  let endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  try {
    const taskList = await Task.find({
      createdAt: { $gt: startDate, $lt: endDate },
    })
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
    const taskList = await Task.find({
      assignedTo: req.params.id,
      status: "pending",
    })
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
  console.log(req.body.remark);
  try {
    await Task.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: { remark: req.body.remark, status: req.body.status },
      }
    ).then((docs) => {
      if (docs) {
        return res.status(200).json({
          meta: {
            success: true,
          },
          data: docs,
          self: req.originalUrl,
        });
      } else {
        return res.status(404).json({
          meta: {
            success: false,
            message: "task not found",
          },
          self: req.originalUrl,
        });
      }
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
  taskListFetcherByRange,
};
