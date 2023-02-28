import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import "./EditGoal.css";
import "./EditGoal.css";

export default function EditGoal({ setEdit, setTab }) {
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    if (singleGoal.id) {
      setName(singleGoal.name);
      setDescription(singleGoal.description);
      setTimeFrame(singleGoal.time_frame);
      setYear(singleGoal.year);
      setMonth(singleGoal.month);
      setWeek(singleGoal.week);
      setStatus(singleGoal.status);
      setCompleted(singleGoal.completed);
      setPriority(singleGoal.priority);
    }
  }, [singleGoal]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editItem = {
      ...singleGoal,
      name,
      description,
      year,
      status,
      month,
      week,
      time_frame: timeFrame,
      completed: completed ? true : false,
      priority,
    };

    const res = dispatch(editGoalThunk(editItem, singleGoal.id));

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
            <label htmlFor="time-frame" className="edit-task-form-labels">
              Time Frame
            </label>
            <select
              className="edit-form-input"
              name="time-frame"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value={null}>None</option>
              <option value="year">Yearly</option>
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
            </select>
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
              <option value={null}>None</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="parent-goal" className="edit-task-form-labels">
              Set a parent goal - NOT FUNCTIONAL YET
            </label>
            <select
              className="edit-form-input"
              name="parent-goal"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value={null}>None</option>
              <option value="a">Goal 1</option>
              <option value="b">Goal 2</option>
              <option value="c">Goal 3</option>
              <option value="d">Goal 4</option>
            </select>
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="status" className="edit-task-form-labels">
              Status
            </label>
            <select
              className="edit-form-input"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="year" className="edit-task-form-labels">
              Change Goal Date
            </label>
            <input
              className="edit-form-input"
              name="year"
              type="datetime-local"
              min={restrictedDateInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
            <div
              className="cancel-button"
              onClick={() => {
                setEdit(false);
                setTab("summary");
              }}
            >
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
