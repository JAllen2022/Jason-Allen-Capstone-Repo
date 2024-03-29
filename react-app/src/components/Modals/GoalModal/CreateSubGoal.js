import ListItem from "../../ReusableComponents/ListField/ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoalThunk } from "../../../store/goals";
import { getCurrentWeek } from "../../../context/Date";

export default function CreateSubGoal({ setShowAdd, showAdd }) {
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
      parent_id: singleGoal.id,
      status: "Not Started",
      priority: priority || "4",
      completed: false,
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
      newListItem.due_date = newListItem.month;
    } else if (timeFrame === "week") {
      // Convert week input value to date range representing the week
      const [year, weekNumber] = date.split("-W");
      const startDate = getWeekStartDate(year, weekNumber);

      newListItem.week = getCurrentWeek(startDate);
      newListItem.due_date = newListItem.week.slice(14);
    }

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      const res = dispatch(addGoalThunk(newListItem));
    }
    setShowAdd(false);
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
      <ListItem subGoal={true} key={item.id} item={item} />
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
    <div className="goal-modal-create-sub-task-container">
      <div className="sub-task-list-display">{displayList}</div>
      {showAdd && (
        <div className="sub-task-list-input-field-container-left">
          <form
            className="goal-modal-create-sub-task-form"
            onSubmit={handleSubmit}
          >
            <div className="sub-task-input-container">
              <label htmlFor="name" className="sub-task-input-labels">
                Name: <span style={{ color: "maroon" }}>*</span>
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
              </label>

              <label htmlFor="time-frame" className="sub-task-input-labels">
                Time Frame <span style={{ color: "maroon" }}>*</span>
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
              </label>
              <label htmlFor="priority" className="sub-task-input-labels">
                Priority
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
              </label>

              <label htmlFor="date" className="sub-task-input-labels">
                Set a Due Date <span style={{ color: "maroon" }}>*</span>
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
                      setDate(e.target.value);
                    }}
                  />
                )}
              </label>
            </div>
            <div className="sub-task-button-container">
              <button type="submit" className="submit-sub-task">
                Create
              </button>
              <div
                onClick={() => setShowAdd(false)}
                className="cancel-sub-task"
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
