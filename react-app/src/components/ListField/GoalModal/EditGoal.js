import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGoalThunk,
  editGoalThunk,
  getGoalsThunk,
} from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import { getCurrentWeek } from "../../Goals";

import CreateSubGoal from "./CreateSubGoal";
import "./GoalModal.css";

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
  const [priority, setPriority] = useState("");
  const { closeModal } = useModal();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (singleGoal.id) {
      setName(singleGoal.name);
      setDescription(singleGoal.description);
      setTimeFrame(singleGoal.time_frame);
      setYear(singleGoal.year);
      // Setting Week

      if (singleGoal.year) {
        setDate(year);
      }
      // Define the original date string
      if (singleGoal.month) {
        const originalDate = singleGoal.month;

        // Split the original date string into an array of month and year
        const dateArray = originalDate.split(", ");

        // Get the month abbreviation from the month name
        const monthAbbreviation = new Date(
          Date.parse(dateArray[0] + " 1, 2022")
        ).toLocaleString("default", { month: "2-digit" });

        // Create the new date string in the format "YYYY-MM"
        const newDate = dateArray[1] + "-" + monthAbbreviation;

        setDate(newDate);
      }
      console.log("checking single week", singleGoal.week);
      if (singleGoal.week) {
        // Define the original date string
        const originalDate = singleGoal.week;

        // Extract the week number and year from the original date string
        const matches = originalDate.match(/(\w+) (\d+) - (\w+) (\d+)/);
        const startDate = new Date(`${matches[1]} ${matches[2]}, 2023`);
        const year = startDate.getFullYear();
        const weekNumber = Math.ceil(
          ((startDate - new Date(`December 28, ${year - 1} 23:59:59`)) /
            86400000 +
            1) /
            7
        );

        // Create the new date string in the format "YYYY-W##"
        const newDate = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

        setDate(newDate);
      }

      setStatus(singleGoal.status);
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

    const newDate = new Date();

    let editItem = {
      ...singleGoal,
      name,
      description,
      year,
      status,
      month,
      week,
      time_frame: timeFrame,
      completed: status == "Completed" ? true : false,
      priority,
    };

    if (timeFrame === "year") {
      // If current year, set to end of the current year
      if (date == "") {
        editItem.due_date = new Date(
          newDate.getFullYear(),
          11,
          31
        ).toLocaleDateString("en-US", dateOptions);
        editItem.year = newDate.getFullYear();
      }
      // Otherwise we set it to the end of whatever year is chosen
      else {
        editItem.due_date = new Date(date, 11, 31).toLocaleDateString(
          "en-US",
          dateOptions
        );
        editItem.year = date;
      }
    } else if (timeFrame === "month") {
      const monthDate = new Date(
        date.slice(0, 4),
        parseInt(date.slice(5, 7)) - 1,
        1
      );
      editItem.month = `${monthDate.toLocaleString("default", {
        month: "long",
      })}, ${newDate.getFullYear()}`;
      editItem.due_date = editItem.month;
    } else if (timeFrame === "week") {
      // Convert week input value to date range representing the week
      const [year, weekNumber] = date.split("-W");
      const startDate = getWeekStartDate(year, weekNumber);
      console.log("checking updated date", date);

      editItem.week = getCurrentWeek(startDate);
      editItem.due_date = editItem.week.slice(14);
    }

    const res = dispatch(editGoalThunk(editItem, singleGoal.id));
    setTab("summary");
    setEdit(false);
  };

  let yearArray = [];
  for (let i = new Date().getFullYear(); i < 2100; i++) {
    yearArray.push(i);
  }

  const getWeekStartDate = (year, weekNumber) => {
    const simple = new Date(year, 0, 2 + (weekNumber - 1) * 7);

    return simple;
  };

  return (
    <>
      <div className="edit-goal-form-left-container">
        <form className="" onSubmit={handleSubmit} type="submit">
          <div className="edit-task-form-div-field">
            <label htmlFor="name" className="edit-task-form-labels">
              Name <span style={{ color: "maroon" }}>*</span>
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
          </div> */}
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
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="time-frame" className="edit-task-form-labels">
              Goal Time Frame <span style={{ color: "maroon" }}>*</span>
            </label>
            <select
              className="edit-form-input"
              name="time-frame"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value={null} disabled={true}>
                None
              </option>
              <option value="year">Yearly</option>
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
            </select>
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="year" className="edit-task-form-labels">
              Goal Date <span style={{ color: "maroon" }}>*</span>
            </label>

            {timeFrame === "year" && (
              <select
                className="edit-form-date-input"
                name="date"
                type="number"
                required={true}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              >
                <option value={null}></option>
                {yearArray.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            )}
            {timeFrame === "month" && (
              <input
                className="edit-form-date-input"
                name="date"
                type="month"
                min={new Date().toISOString().slice(0, 7)}
                required={true}
                value={date}
                onChange={(e) => {
                  const yearMonth = e.target.value.split("-");
                  const formattedDate = `${yearMonth[0]}-${yearMonth[1]}`;
                  setDate(formattedDate);
                }}
              />
            )}
            {timeFrame === "week" && (
              <input
                className="edit-form-date-input"
                name="date"
                type="week"
                min={new Date().toISOString().slice(0, 7)}
                required={true}
                value={date}
                onChange={(e) => {
                  console.log("checking week ", e.target.value);
                  setDate(e.target.value);
                }}
              />
            )}
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
