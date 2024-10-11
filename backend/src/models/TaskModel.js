import mongoose from "mongoose";

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
    subtaskname: {
      type: String,
      required: true,
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
