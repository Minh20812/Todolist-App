import { useState } from "react";
import { Transition, Listbox, RadioGroup } from "@headlessui/react";
import { Fragment } from "react";
import { useAddTaskMutation } from "../../../redux/api/taskApiSlice";

const priorities = [
  { name: "Low", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "High", value: "high" },
];

const repeatOptions = [
  { name: "None", value: "none" },
  { name: "Next 24 hours", value: "24h" },
  { name: "Weekly", value: "weekly" },
  { name: "Monthly", value: "monthly" },
  { name: "Yearly", value: "yearly" },
];

const MainAddTask = () => {
  const [addTask] = useAddTaskMutation();
  const [taskname, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "" }]);
  const [duedate, setDuedate] = useState("");
  const [priority, setPriority] = useState(priorities[0]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [labels, setLabels] = useState(["Urgent", "Home", "Work"]);
  const [project, setProject] = useState("");
  const [reminder, setReminder] = useState("");
  const [location, setLocation] = useState("");
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [repeatOption, setRepeatOption] = useState(repeatOptions[0]);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      taskname,
      description,
      subtasks,
      project,
      duedate,
      priority: priority.value,
      labels: selectedLabels,
      reminder: new Date(reminder),
      repeat: repeatOption.value,
      location,
    };

    console.log(data);

    try {
      await addTask(data).unwrap();
      // Reset form
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h2 className="text-2xl font-semibold mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <div className=" gap-10">
              {/* Task Name */}
              <div className="mb-4 flex gap-4 ">
                <label className="block text-sm font-medium text-gray-700">
                  Task Name
                </label>
                <input
                  type="text"
                  value={taskname}
                  onChange={(e) => setTask(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Description */}
              <div className="mb-4 flex gap-4 ">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Subtasks */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subtasks
                </label>
                <div className=" grid-cols-2">
                  {subtasks.map((subtask, index) => (
                    <input
                      key={index}
                      type="text"
                      value={subtask.name}
                      onChange={(e) => {
                        const newSubtasks = [...subtasks];
                        newSubtasks[index].name = e.target.value;
                        setSubtasks(newSubtasks);
                      }}
                      placeholder={`Subtask ${index + 1}`}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="text-blue-500 text-sm"
                >
                  + Add Subtask
                </button>
              </div>
            </div>
            <div className=" gap-10">
              {/* Project */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project
                </label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Priority */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <RadioGroup value={priority} onChange={setPriority}>
                  <div className="flex gap-4">
                    {priorities.map((prio) => (
                      <RadioGroup.Option
                        key={prio.value}
                        value={prio}
                        className="cursor-pointer"
                      >
                        {({ active, checked }) => (
                          <span
                            className={`py-2 px-4 rounded-lg border ${
                              checked
                                ? "bg-indigo-600 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          >
                            {prio.name}
                          </span>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Due Date */}
              <div className="mb-4 flex gap-4 ">
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={duedate}
                  onChange={(e) => setDuedate(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Repeat Option */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Repeat
                </label>
                <Listbox value={repeatOption} onChange={setRepeatOption}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="block truncate">
                        {repeatOption.name}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        {`v`}
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {repeatOptions.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            value={option}
                            className={({ active }) =>
                              `${
                                active
                                  ? "text-white bg-indigo-600"
                                  : "text-gray-900"
                              }
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`${
                                    selected ? "font-medium" : "font-normal"
                                  } block truncate`}
                                >
                                  {option.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                    CheckIcon
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* Labels */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Labels
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {labels.map((label) => (
                    <label key={label} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedLabels.includes(label)}
                        onChange={() => {
                          setSelectedLabels((prev) =>
                            prev.includes(label)
                              ? prev.filter((l) => l !== label)
                              : [...prev, label]
                          );
                        }}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2 text-sm">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Add new label"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newLabel.trim() && !labels.includes(newLabel)) {
                        setLabels([...labels, newLabel]);
                        setNewLabel("");
                      }
                    }}
                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md text-sm"
                  >
                    Add Label
                  </button>
                </div>
              </div>

              {/* Reminder */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Reminder
                </label>
                <input
                  type="datetime-local"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Location */}
              <div className="mb-4 flex gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainAddTask;
