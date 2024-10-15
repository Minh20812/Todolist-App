import mongoose from "mongoose";

// Define the subtask schema as a part of the task
const subtaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Each subtask must have a name
  },
});

const taskSchema = mongoose.Schema(
  {
    taskname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subtasks: {
      type: [subtaskSchema], // Array of subtasks, each with a name field
      default: [], // Default is an empty array if no subtasks are provided
    },
    project: {
      type: String,
      required: true,
    },
    duedate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"], // Example of priority levels
      default: "medium",
    },
    labels: {
      type: [String], // Array of strings for labels/tags
      default: [],
    },
    reminders: {
      type: [Date], // Array of dates for reminders
      default: [],
    },
    location: {
      type: String, // Location as a string or use an Object for coordinates
      default: "",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
