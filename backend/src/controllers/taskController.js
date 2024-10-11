import Task from "../models/TaskModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Helper function for checking required fields
const validateTaskFields = ({ taskname, duedate, priority }) => {
  if (!taskname || !duedate || !priority) {
    throw new Error("Please provide all the required task fields");
  }
};

const addTask = asyncHandler(async (req, res) => {
  const {
    taskname,
    description,
    subtaskname,
    project,
    duedate,
    priority,
    labels,
    reminders,
    location,
  } = req.body;

  // Validate required fields for task creation
  validateTaskFields(req.body);

  // Check if a task with the same name and project already exists
  const taskExists = await Task.findOne({ taskname, project });
  if (taskExists) {
    return res.status(400).json({
      message: "Task with the same name in this project already exists",
    });
  }

  const newTask = new Task({
    taskname,
    description,
    subtaskname,
    project,
    duedate,
    priority,
    labels,
    reminders,
    location,
  });

  await newTask.save();
  return res.status(201).json({
    _id: newTask._id,
    taskname: newTask.taskname,
    project: newTask.project,
    duedate: newTask.duedate,
    priority: newTask.priority,
  });
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  if (!tasks) {
    return res.status(404).json({ message: "No tasks found" });
  }
  res.json(tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res
      .status(404)
      .json({ message: `Task with ID ${req.params.id} not found` });
  }
  res.json(task);
});

const deleteTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res
      .status(404)
      .json({ message: `Task with ID ${req.params.id} not found` });
  }

  await Task.deleteOne({ _id: req.params.id });
  res.json({ message: `Task with ID ${req.params.id} deleted successfully` });
});

const updateTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with ID ${req.params.id} not found` });
    }

    // Update only the fields that are allowed to be updated
    task.taskname = req.body.taskname || task.taskname;
    task.description = req.body.description || task.description;
    task.subtaskname = req.body.subtaskname || task.subtaskname;
    task.project = req.body.project || task.project;
    task.duedate = req.body.duedate || task.duedate;
    task.priority = req.body.priority || task.priority;
    task.labels = Array.isArray(req.body.labels)
      ? req.body.labels
      : task.labels;
    task.reminders = Array.isArray(req.body.reminders)
      ? req.body.reminders
      : task.reminders;
    task.location = req.body.location || task.location;

    const updatedTask = await task.save();

    res.json({
      _id: updatedTask._id,
      taskname: updatedTask.taskname,
      description: updatedTask.description,
      subtaskname: updatedTask.subtaskname,
      project: updatedTask.project,
      duedate: updatedTask.duedate,
      priority: updatedTask.priority,
      labels: updatedTask.labels,
      reminders: updatedTask.reminders,
      location: updatedTask.location,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while updating the task",
        error: error.message,
      });
  }
});

export { addTask, getAllTasks, deleteTaskById, getTaskById, updateTaskById };
