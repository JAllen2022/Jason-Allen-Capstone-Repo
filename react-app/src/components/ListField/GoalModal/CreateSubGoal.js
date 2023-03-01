import ListItem from "../ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoalThunk } from "../../../store/goals";
import { getCurrentWeek } from "../../Goals";
import "./CreateSubGoal.css";

export default function CreateSubGoal({ parentId }) {
  const [name, setName] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const singleGoal = useSelector((state) => state.goals.singleGoal);

  const dispatch = useDispatch();

  const newDate = new Date(date);

  console.log("checking date", date);
  // console.log("checking month", new Date().toISOString());
  // console.log(
  //   "checking this",
  //   new Date("2023-07-01").toLocaleString("default", {
  //     month: "long",
  //   })
  // );
  // console.log("checking this", new Date().toISOString().slice(0, 7));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Change the week,month,year input based on whatever time_frame is chosen as well as what
    // due date is input.
    const newDate = new Date(date);

    const newListItem = {
      name: name,
      time_frame: timeFrame,
      parent_id: parentId,
      priority,
      completed: false,
      due_date: newDate,
    };
    if (timeFrame === "year") newListItem.year = newDate.getFullYear();
    else if (timeFrame === "month") {
      newListItem.month = `${newDate.toLocaleString("default", {
        month: "long",
      })}, ${newDate.getFullYear()}`;
    } else if (timeFrame === "week") {
      newListItem.week = getCurrentWeek(newDate);
    }

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      const res = dispatch(addGoalThunk(newListItem));
      if (res) console.log("checking response", res);
    }
    setName("");
  };

  const defaultListHeight = 10;
  let displayList = [];
  if (singleGoal.sub_goals) {
    const array = Object.values(singleGoal.sub_goals);
    displayList = array.map((item) => <ListItem key={item.id} item={item} />);
  }
  if (displayList.length < defaultListHeight) {
    for (let i = displayList.length; i < defaultListHeight; i++) {
      displayList.push(<ListItem empty={true} />);
    }
  }

  // Adding restritive due date function
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = year + "-" + addZero(month) + "-" + addZero(day);

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
        <form
          className="sub-goal-list-form-container"
          onSubmit={handleSubmit}
          type="submit"
        >
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
            required={true}
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value={null}>None</option>
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
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={null}>None</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>

          <label htmlFor="date" className="edit-task-form-labels">
            Set a Due Date <span style={{ color: "maroon" }}>*</span>
          </label>
          {/* <input
            className="edit-form-date-input"
            name="year"
            type="date"
            min={restrictedDay}
            required={true}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input> */}
          {timeFrame === "year" && (
            <select
              className="edit-form-date-input"
              name="date"
              type="number"
              required={true}
              default={year}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              {yearArray.map((month, index) => (
                <option key={index} value={index}>
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

          <button type="submit" className="submit-sub-task">
            Create
          </button>
        </form>
      </div>
      <div className="sub-goal-list-display">{displayList}</div>
    </div>
  );
}
