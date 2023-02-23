import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk, editTaskThunk } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";

import "./EditListField.css";
export default function EditListField({ item }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.name || "");
  const [description, setDescription] = useState(item.description || "");
  const [priority, setPriority] = useState(item.priority || "");
  const [taskDuration, setTaskDuration] = useState(item.task_duration || "");
  const [dueDate, setDueDate] = useState(item.due_date || "");
  const [recurringFrequency, setRecurringFrequency] = useState(
    item.recurring_frequency || ""
  );
  const [recurringDate, setRecurringDate] = useState(item.recurring_date || "");
  const [assignDate, setAssignDate] = useState(item.assign_date || "");
  const [completed, setCompleted] = useState(item.completed || false);
  console.log("checking completed", completed);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let editItem = {
      ...item,
      name,
      description,
      priority,
      task_duration: taskDuration,
      assign_date: assignDate,
      due_date: dueDate,
      recurring_frequency: recurringFrequency,
      recurring_date: recurringDate,
      completed: completed ? true : false,
    };

    console.log("checking edit itm", editItem);
    const res = dispatch(editTaskThunk(editItem, item.id));

    closeModal();
  };

  const { closeModal } = useModal();
  useEffect(() => {
    dispatch(getTasksThunk);
  }, [dispatch]);

  const durationOptions = [
    <option value={null}>None</option>,
    <option value="15">15 minutes</option>,
    <option value="30">30 minutes</option>,
    <option value="45">45 minutes</option>,
  ];
  for (let i = 1; i < 5; i++) {
    for (let j = 0; j <= 45; j += 15) {
      const value = i * 60 + j;
      durationOptions.push(
        <option value={`${value}`}>
          {i} hours, {j} minutes
        </option>
      );
    }
  }

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
            minLength="1"
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
            {durationOptions}
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
          <label htmlFor="start-date" className="">
            Assign Date
          </label>
          <input
            className=""
            name="start-date"
            type="datetime-local"
            value={assignDate}
            onChange={(e) => setAssignDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="due-date" className="">
            Due Date
          </label>
          <input
            className=""
            name="due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="recurring-date" className="">
            Recurring Date Start
          </label>
          <input
            className=""
            name="recurring"
            type="datetime-local"
            value={recurringDate}
            onChange={(e) => setRecurringDate(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="completed" className="">
            Completed?
          </label>
          <input
            className=""
            // className="song-input-field"
            name="completed"
            checked={completed}
            type="checkbox"
            onChange={() => setCompleted((prev) => !prev)}
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
