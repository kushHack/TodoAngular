const Tasks = require("../models/taskModel");
const mongoose = require("mongoose");

// get all tasks
const getAllTasks = async (req, res) => {
  const tasks = await Tasks.find({}).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

// create a new task
const createTask = async (req, res) => {
  const { task, status } = req.body;
  try {
    const taskReq = await Tasks.create({ task, status });
    res.status(200).json(taskReq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task exists" });
  }

  const taskReq = await Tasks.findOneAndDelete({ _id: id });

  if (!taskReq) {
    return req.status(400).json({ error: "No such task exists" });
  }

  res.status(200).json(taskReq);
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task wxists" });
  }

  const taskReq = await Tasks.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!taskReq) {
    return req.status(400).json({ error: "No such task exists" });
  }
  res.status(200).json(taskReq);
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
