import React, { useEffect, useState } from "react";
import { useGetAllTasksQuery } from "../../../redux/api/taskApiSlice";
import UpdateTaskModal from "../component/updateTaskModal";

const MainToday = () => {
  const { data: tasks, error, isLoading, refetch } = useGetAllTasksQuery();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openUpdateModal = (task) => {
    setUpdateModalOpen(true);
    setSelectedTask(task);
  };

  const closeUpdateModal = (task) => {
    setUpdateModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    if (tasks) {
      console.log("Tasks was fetched");
      // console.log("Fetched tasks:", tasks); // Log tasks data
    }
    if (error) {
      console.error("Error fetching tasks:", error); // Log error if any
    }
  }, [tasks, error]);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error loading tasks: {error.message}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
      {tasks && tasks.length > 0 ? (
        <ul className="space-y-4 flex">
          {tasks.map((task) => (
            <li key={task._id} className=" p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold">{task.taskname}</h3>
              <p>SubTask: {task.subtaskname}</p>
              <p>Description: {task.description}</p>
              <p>Due Date: {new Date(task.duedate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
              <p>Project: {task.project}</p>
              <p>Labels: {task.labels}</p>
              <p>Reminders: {task.reminders}</p>
              <p>Location: {task.location}</p>
              <button onClick={() => openUpdateModal(task)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
      <UpdateTaskModal
        isOpen={updateModalOpen}
        closeModal={closeUpdateModal}
        task={selectedTask}
        refetch={refetch}
      />
    </div>
  );
};

export default MainToday;
