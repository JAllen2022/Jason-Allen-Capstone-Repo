import ListItem from "../ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoalThunk } from "../../../store/goals";
import { getCurrentWeek } from "../../Goals";
import "./GoalModal.css";

export default function CreateSubGoal({ parentId, setTab }) {
  const [name, setName] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const singleGoal = useSelector((state) => state.goals.singleGoal);

  const dispatch = useDispatch();
  // Adding restritive due date function
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = year + "-" + addZero(month) + "-" + addZero(day);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const newDate = new Date(date, 1, 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Change the week,month,year input based on whatever time_frame is chosen as well as what
    // due date is input.
    const newDate = new Date();

    const newListItem = {
      name: name,
      time_frame: timeFrame,
      parent_id: parentId,
      priority,
      completed: false,
      input_date: date,
    };
    if (timeFrame === "year") {
      // If current year, set to end of the current year
      if (date == "") {
        newListItem.due_date = new Date(
          newDate.getFullYear(),
          11,
          31
        ).toLocaleDateString("en-US", dateOptions);
        newListItem.year = newDate.getFullYear();
      }
      // Otherwise we set it to the end of whatever year is chosen
      else {
        newListItem.due_date = new Date(date, 11, 31).toLocaleDateString(
          "en-US",
          dateOptions
        );
        newListItem.year = date;
      }
    } else if (timeFrame === "month") {
      const monthDate = new Date(
        date.slice(0, 4),
        parseInt(date.slice(5, 7)) - 1,
        1
      );
      newListItem.month = `${monthDate.toLocaleString("default", {
        month: "long",
      })}, ${newDate.getFullYear()}`;
    } else if (timeFrame === "week") {
      // Convert week input value to date range representing the week
      const [year, weekNumber] = date.split("-W");
      const startDate = getWeekStartDate(year, weekNumber);

      newListItem.week = getCurrentWeek(startDate);
    }
    console.log("checking newListItem", newListItem);

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      const res = dispatch(addGoalThunk(newListItem));
      if (res) console.log("checking response", res);
    }

    setName("");
    setDate("");
    setTimeFrame("");
  };

  // const [yearS, weekNumber] = date.split("-W");

  const getWeekStartDate = (year, weekNumber) => {
    const simple = new Date(year, 0, 2 + (weekNumber - 1) * 7);

    return simple;
  };

  const defaultListHeight = 10;
  let displayList = [];
  if (singleGoal.sub_goals) {
    const array = Object.values(singleGoal.sub_goals);
    displayList = array.map((item) => (
      <ListItem subGoal={true} setTab={setTab} key={item.id} item={item} />
    ));
  }
  if (displayList.length < defaultListHeight) {
    for (let i = displayList.length; i < defaultListHeight; i++) {
      displayList.push(<ListItem empty={true} />);
    }
  }

  // Validation to ensure name is not all spaces
  function handleNameChange(event) {
    const value = event.target.value;
    if (value.trim().length === 0) {
      event.target.setCustomValidity("Invalid name");
    } else {
      event.target.setCustomValidity("");
    }
    setName(value);
  }

  // Creating array of year options
  let yearArray = [];
  for (let i = year; i < 2100; i++) {
    yearArray.push(i);
  }

  return (
    <div className="goal-modal-sub-goal-container">
      <div className="create-sub-goal-container">
        <h4>Create a Sub-Goal:</h4>
        <form className="sub-goal-list-form-container" onSubmit={handleSubmit}>
          <label htmlFor="name" className="edit-task-form-labels">
            Name: <span style={{ color: "maroon" }}>*</span>
          </label>
          <input
            className="edit-form-input"
            placeholder={"Add a sub goal..."}
            name="name"
            type="text"
            maxLength="50"
            required={true}
            value={name}
            onChange={handleNameChange}
          ></input>

          <label htmlFor="time-frame" className="edit-task-form-labels">
            Time Frame <span style={{ color: "maroon" }}>*</span>
          </label>
          <select
            className="edit-form-select-input"
            name="time-frame"
            defaultValue={null}
            required={true}
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value={""} disabled={true}>
              Select time frame
            </option>
            <option value="year">Yearly</option>
            <option value="month">Monthly</option>
            <option value="week">Weekly</option>
          </select>
          <label htmlFor="priority" className="edit-task-form-labels">
            Priority
          </label>
          <select
            className="edit-form-select-input"
            name="priority"
            defaultValue={null}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={""} disabled={true}>
              Select priority
            </option>
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
            <option value="4">Priority 4</option>
          </select>

          <label htmlFor="date" className="edit-task-form-labels">
            Set a Due Date <span style={{ color: "maroon" }}>*</span>
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
              onChange={(e) => setDate(e.target.value)}
            />
          )}

          <button className="submit-sub-task">Create</button>
        </form>
      </div>
      <div className="sub-goal-list-display">{displayList}</div>
    </div>
  );
}
