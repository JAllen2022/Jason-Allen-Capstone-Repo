import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskThunk, editTaskThunk } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateSubTask from "./CreateSubTask";
import TaskSummary from "./TaskSummary";
import EditTask from "./EditTask";
import OpenModalButton from "../../OpenModalButton";
import DeleteConfirmation from "../../DeleteConfirmation";

import { deleteTaskThunk } from "../../../store/tasks";
import "./EditListField.css";

export default function EditGoal({ setEdit, setTab }) {
  const singleTask = useSelector((state) => state.tasks.singleTask);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [dueDate, setDueDate] = useState("");
  //   const [recurringFrequency, setRecurringFrequency] = useState("");
  //   const [recurringDate, setRecurringDate] = useState("");
  //   const [assignDate, setAssignDate] = useState("");
  const [completed, setCompleted] = useState(false);
  //   const [showMenu, setShowMenu] = useState(false);
  //   const { closeModal } = useModal();

  function getDayName(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return days[dayIndex];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Changing due date back to time in database
    const newDate = new Date(
      dueDate.slice(0, 4),
      parseInt(dueDate.slice(5, 7)) - 1,
      dueDate.slice(8)
    );
    const day = newDate.getDate();
    const month = newDate.toLocaleString("default", { month: "long" });
    const year = newDate.getFullYear().toString().slice(-2);
    const newTimeStr = `${getDayName(newDate)}, ${month} ${day}, ${year}`;

    console.log("checking newDate", newDate);
    console.log("checking newDate", dueDate);

    let editItem = {
      ...singleTask,
      name,
      description,
      priority,
      task_duration: taskDuration,
      //   assign_date: assignDate,
      due_date: newTimeStr,
      //   recurring_frequency: recurringFrequency,
      //   recurring_date: recurringDate,
      completed: completed ? true : false,
    };

    const res = dispatch(editTaskThunk(editItem, singleTask.id));
    setTab("summary");
    setEdit(false);
  };

  useEffect(() => {
    if (singleTask.id) {
      setName(singleTask.name);
      setDescription(singleTask.description);
      setPriority(singleTask.priority);
      setTaskDuration(singleTask.task_duration);
      //   setRecurringFrequency(singleTask.recurring_frequency);
      //   setRecurringDate(singleTask.recurring_date);
      //   setAssignDate(singleTask.assign_date);
      setCompleted(singleTask.completed);

      // Changing due_date to format for input date
      const date = new Date(singleTask.due_date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const newTimeStr = `${year}-${month}-${day}`;

      setDueDate(newTimeStr);
    }
  }, [singleTask]);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Formatting time constraints for google doc form
  const now = new Date();
  const yearS = now.getFullYear();
  const monthS = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = yearS + "-" + addZero(monthS) + "-" + addZero(day);
  const restrictedDateInput =
    yearS +
    "-" +
    addZero(monthS) +
    "-" +
    addZero(day) +
    "T" +
    addZero(hour) +
    ":" +
    addZero(minute);

  let yearArray = [];
  for (let i = new Date().getFullYear(); i < 2100; i++) {
    yearArray.push(i);
  }

  const getWeekStartDate = (year, weekNumber) => {
    const simple = new Date(year, 0, 2 + (weekNumber - 1) * 7);

    return simple;
  };
  const durationOptions = [
    <option value={null}>None</option>,
    <option value="15 minutes">15 minutes</option>,
    <option value="30 minutes">30 minutes</option>,
    <option value="45 minutes">45 minutes</option>,
  ];
  for (let i = 1; i < 5; i++) {
    for (let j = 0; j <= 45; j += 15) {
      const value = i * 60 + j;
      durationOptions.push(
        <option value={`${i} hours, ${j} minutes`}>
          {i} hours, {j} minutes
        </option>
      );
    }
  }

  const cancelClick = () => {
    setTab("summary");
    setEdit(false);
  };

  return (
    <>
      <div className="edit-goal-form-left-container">
        <form className="" onSubmit={handleSubmit} type="submit">
          <div className="edit-task-form-div-field">
            <label htmlFor="name" className="edit-task-form-labels">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="edit-form-input"
              // className="song-input-field"
              required
              name="name"
              minLength="1"
              maxLength="20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="edit-task-form-div-field">
            <label htmlFor="description" className="edit-task-form-labels">
              Description
            </label>
            <textarea
              className="edit-form-input"
              // className="song-input-field"
              name="description"
              maxLength="500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="priority" className="edit-task-form-labels">
              Priority
            </label>
            <select
              className="edit-form-input"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value={null} disabled={true}>
                None
              </option>
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
            </select>
          </div>
          {/* <div className="edit-task-form-div-field">
              <label htmlFor="add-goal" className="edit-task-form-labels">
                Add to a goal{" "}
                <span style={{ color: "red", border: "1px solid red" }}>
                  {" "}
                  NOT SET UP YET
                </span>
              </label>
              <select
                className="edit-form-input"
                name="add-goal"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={null}>None</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div> */}
          <div className="edit-task-form-div-field">
            <label htmlFor="duration" className="edit-task-form-labels">
              Task Duration
            </label>
            <select
              className="edit-form-input"
              name="duration"
              value={taskDuration}
              onChange={(e) => setTaskDuration(e.target.value)}
            >
              {durationOptions}
            </select>
          </div>
          {/* <div className="edit-task-form-div-field">
            <label
              htmlFor="recurring-frequency"
              className="edit-task-form-labels"
            >
              Recurring Frequency
            </label>
            <select
              className="edit-form-input"
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
          <div className="edit-task-form-div-field">
            <label htmlFor="recurring-date" className="edit-task-form-labels">
              Recurring Date Start
            </label>
            <input
              className="edit-form-input"
              name="recurring"
              type="datetime-local"
              min={restrictedDateInput}
              value={recurringDate}
              onChange={(e) => setRecurringDate(e.target.value)}
            ></input>
          </div> */}
          <div className="edit-task-form-div-field">
            <label htmlFor="due-date" className="edit-task-form-labels">
              Due Date
            </label>
            <input
              className="edit-form-input"
              name="due-date"
              type="date"
              min={restrictedDay}
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            ></input>
          </div>

          <div className="edit-task-check-box-container">
            <label htmlFor="completed" className="edit-task-form-labels">
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

          <div className="edit-task-buttons">
            <div className="cancel-button" onClick={cancelClick}>
              Cancel
            </div>
            <div className="cancel-button" type="submit" onClick={handleSubmit}>
              Save
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
