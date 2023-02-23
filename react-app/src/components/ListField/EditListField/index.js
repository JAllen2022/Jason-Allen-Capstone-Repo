import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";

import "./EditListField.css";
export default function EditListField() {
  const singleTask = useSelector((state) => state.tasks.task);
  const dispatch = useDispatch();
  const [name, setName] = useState(singleTask.name || "");
  const [description, setDescription] = useState(singleTask.description || "");
  const [priority, setPriority] = useState(singleTask.priority || "");
  const [taskDuration, setTaskDuration] = useState(
    singleTask.task_duration || ""
  );
  const [dueDate, setDueDate] = useState(singleTask.due_date || "");
  const [recurringFrequency, setRecurringFrequency] = useState(
    singleTask.recurring_frequency || ""
  );
  const [recurringDate, setRecurringDate] = useState(
    singleTask.recurring_date || ""
  );
  const [completed, setCompleted] = useState(singleTask.completed || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const { closeModal } = useModal();
  useEffect(() => {
    dispatch(getTasksThunk);
  }, [dispatch]);

  return (
    <>
      <h1>Editing list field</h1>
      <form className="" onSubmit={handleSubmit} type="submit">
        <div>
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            className=""
            // className="song-input-field"
            required
            name="name"
            minLength="4"
            maxLength="20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="">
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea
            className=""
            // className="song-input-field"
            required
            name="description"
            maxlength="500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="priority" className="">
            Priority
          </label>
          <select
            className=""
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={null}>None</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="duration" className="">
            Task Duration
          </label>
          <select
            className=""
            name="duration"
            value={taskDuration}
            onChange={(e) => setTaskDuration(e.target.value)}
          >
            <option value={null}>None</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="recurring-frequency" className="">
            Recurring Frequency
          </label>
          <select
            className=""
            name="recurring-frequency"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={null}>None</option>
            <option value="1">Daily</option>
            <option value="7">Weekly</option>
            <option value="30">Monthly</option>
            <option value="365">Yearly</option>
          </select>
        </div>

        <div>
          <label htmlFor="completed" className="">
            Completed?
          </label>
          <input
            className=""
            // className="song-input-field"
            required
            name="completed"
            value={completed}
            type="checkbox"
            onChange={(e) => setCompleted(e.target.value)}
          />
        </div>

        <div className="up-buttons">
          <div onClick={() => closeModal()}>Cancel</div>
          <button id="" className="" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
