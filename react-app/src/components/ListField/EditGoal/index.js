import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import "./EditGoal.css";

export default function EditGoal({ itemId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singleGoal = useSelector((state) => state.goals.singleGoal);
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

  console.log("we are checking the singleGoal", singleGoal);
  console.log("we are checking the singleGoal", itemId);

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

    closeModal();
  };

  const cancelClick = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getGoalThunk(itemId));
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
    <div className="edit-task-form-container">
      <h1 className="edit-task-form-container-title">
        Edit Goal: {singleGoal.name}
      </h1>
      <div className="edit-task-form-body-container">
        <div className="edit-task-form-left-container">
          <form className="" onSubmit={handleSubmit} type="submit">
            <div className="edit-task-form-div-field">
              <label htmlFor="name" className="edit-task-form-labels">
                Name <span style={{ color: "red" }}>*</span>
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

            <div className="edit-task-form-div-field">
              <label htmlFor="description" className="edit-task-form-labels">
                Description
              </label>
              <textarea
                className=""
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
                className=""
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
            <div className="edit-task-form-div-field">
              <label htmlFor="parent-goal" className="edit-task-form-labels">
                Set a parent goal - NOT FUNCTIONAL YET
              </label>
              <select
                className=""
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
                className=""
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
                className=""
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
              <div className="cancel-button" onClick={cancelClick}>
                Cancel
              </div>
              <div
                className="cancel-button"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </div>
            </div>
          </form>
        </div>
        <div className="edit-task-form-right-container">
          <div className="edit-task-create-subtasks-container">
            <h4 className="create-subtask-header">Create a Sub-Goal</h4>
            <CreateSubGoal parentId={singleGoal.id} />
          </div>
          <div className="edit-task-create-note-container"> Create Note</div>
        </div>
      </div>
    </div>
  );
}
