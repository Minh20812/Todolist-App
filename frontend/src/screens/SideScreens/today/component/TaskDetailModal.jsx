import React, { useState } from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../../../redux/api/taskApiSlice";
import { useGetAllProjectsQuery } from "../../../../redux/api/projectApiSlice";
import { useGetAllLabelsQuery } from "../../../../redux/api/labelApiSlice";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import MultiSelectLabelDropdown from "../../addTask/component/MultiSelectedLabel";

const priorities = [
  { name: "Low", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "High", value: "high" },
];

const TaskDetailModal = ({ isOpen, closeModal, task, refetch }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [taskname, setTaskname] = useState(task?.taskname || "");
  const [description, setDescription] = useState(task?.description || "");
  const [duedate, setDuedate] = useState(task?.duedate || "");
  const [reminder, setReminder] = useState(
    task?.reminders?.length > 0 ? task.reminders[0] : ""
  );
  const [priority, setPriority] = useState(
    priorities.find((p) => p.value === task?.priority) || priorities[0]
  );
  const [subtasks, setSubtasks] = useState(task?.subtasks || [{ name: "" }]);
  const [location, setLocation] = useState(task?.location || "");
  const [selectedProject, setSelectedProject] = useState(task?.project || "");
  const [selectedLabels, setSelectedLabels] = useState(task?.labels || []);

  const { data: projects = [] } = useGetAllProjectsQuery();
  const { data: labels = [] } = useGetAllLabelsQuery();

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task._id);
        if (refetch) refetch();
        toast.success("Task deleted successfully");
        closeModal();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSaveTask = async () => {
    try {
      const updatedTask = {
        id: task._id,
        taskname,
        description,
        subtasks,
        project: selectedProject,
        duedate,
        priority: priority.value,
        labels: selectedLabels,
        reminders: reminder ? [reminder] : [],
        location,
        completed: task.completed,
      };

      await updateTask(updatedTask).unwrap();
      if (refetch) refetch();
      toast.success("Task updated successfully");
      setIsEditMode(false);
      closeModal();
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].name = value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: "" }]);
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Tăng chiều rộng modal */}
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          {/* Title area */}
          <h2 className="text-2xl font-bold text-indigo-600">{taskname}</h2>
          <FaXmark
            onClick={closeModal}
            className="text-gray-500 cursor-pointer size-10"
          />
        </div>
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Column - Task Info */}
          <div className="flex-1 space-y-4">
            {/* Task Name */}
            <div>
              <label className="text-gray-600 font-semibold">Task Name:</label>
              <input
                type="text"
                value={taskname}
                onChange={(e) => setTaskname(e.target.value)}
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-600 font-semibold">
                Description:
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="text-gray-600 font-semibold">Due Date:</label>
              <input
                type="date"
                value={duedate ? duedate.split("T")[0] : ""}
                onChange={(e) => setDuedate(e.target.value)}
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              />
            </div>

            {/* Reminder */}
            <div>
              <label className="text-gray-600 font-semibold">Reminder:</label>
              <input
                type="datetime-local"
                value={reminder ? reminder.split(".")[0] : ""}
                onChange={(e) => setReminder(e.target.value)}
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              />
            </div>

            {/* Project */}
            <div>
              <label className="text-gray-600 font-semibold">Project:</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column - Other Info */}
          <div className="flex-1 space-y-4">
            {/* Priority */}
            <div>
              <label className="text-gray-600 font-semibold">Priority:</label>
              <select
                value={priority.value}
                onChange={(e) =>
                  setPriority(
                    priorities.find((p) => p.value === e.target.value)
                  )
                }
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              >
                {priorities.map((prio) => (
                  <option key={prio.value} value={prio.value}>
                    {prio.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Labels */}
            <div>
              <label className="text-gray-600 font-semibold">Labels:</label>
              <MultiSelectLabelDropdown
                labels={labels}
                selectedLabels={selectedLabels}
                onChange={setSelectedLabels}
                disabled={!isEditMode}
              />
            </div>

            {/* Subtasks */}
            <div className="mt-4">
              <label className="text-gray-600 font-semibold">Subtasks:</label>
              {subtasks.map((subtask, index) => (
                <input
                  key={index}
                  type="text"
                  value={subtask.name}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  disabled={!isEditMode}
                  className={`mt-1 block w-full px-3 py-2 ${
                    isEditMode ? "bg-white" : "bg-gray-100"
                  } border border-gray-300 rounded-md shadow-sm sm:text-sm mb-2`}
                />
              ))}
              {isEditMode && (
                <button
                  onClick={handleAddSubtask}
                  className="text-blue-500 text-sm"
                >
                  + Add Subtask
                </button>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="text-gray-600 font-semibold">Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!isEditMode}
                className={`mt-1 block w-full px-3 py-2 ${
                  isEditMode ? "bg-white" : "bg-gray-100"
                } border border-gray-300 rounded-md shadow-sm sm:text-sm`}
              />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t mt-6 pt-4 flex justify-between">
          <button
            onClick={deleteHandler}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400"
          >
            Delete
          </button>

          {isEditMode ? (
            <button
              onClick={handleSaveTask}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
