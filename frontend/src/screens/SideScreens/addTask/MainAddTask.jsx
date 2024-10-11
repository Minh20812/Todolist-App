import { useState } from "react";
import { useAddTaskMutation } from "../../../redux/api/taskApiSlice";

const MainAddTask = () => {
  const [addTask] = useAddTaskMutation();
  const [taskname, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [subtaskname, setSubtask] = useState("");
  const [duedate, setDuedate] = useState("");
  const [priority, setPriority] = useState("");
  const [labels, setLabels] = useState("");
  const [project, setProject] = useState("");
  const [reminders, setReminders] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

  const openLabelModal = () => {
    setIsLabelModalOpen(true);
  };

  const closeLabelModal = () => {
    setIsLabelModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = {
      taskname,
      description,
      subtaskname,
      project,
      duedate,
      priority,
      labels: labels.split(",").map((label) => label.trim()), // Chuyển đổi thành mảng
      reminders: reminders
        ? reminders.split(",").map((date) => new Date(date.trim()))
        : [], // Chuyển đổi thành mảng ngày
      location,
    };

    console.log(data);

    try {
      await addTask(data).unwrap();
      setSuccess("Task added successfully!");
      setTask(""); // Clear input fields
      setDescription("");
      setSubtask("");
      setDuedate("");
      setPriority("");
      setLabels("");
      setProject("");
      setReminders("");
      setLocation("");
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Task Name</label>
              <input
                type="text"
                value={taskname}
                onChange={(e) => setTask(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Subtask Name</label>
              <input
                type="text"
                value={subtaskname}
                onChange={(e) => setSubtask(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Project</label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Due Date</label>
              <input
                type="date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label>Labels</label>
              <input
                type="text"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="Comma separated labels"
              />
              <button>Add label</button>
            </div>

            <div>
              <label>Reminders</label>
              <input
                type="text"
                value={reminders}
                onChange={(e) => setReminders(e.target.value)}
                placeholder="Comma separated reminders (optional)"
              />
            </div>

            <div>
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (optional)"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Task"}
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </div>
    </>
  );
};

export default MainAddTask;
