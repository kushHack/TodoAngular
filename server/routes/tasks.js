const express = require("express");
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.patch("/", updateTask);

module.exports = router;
