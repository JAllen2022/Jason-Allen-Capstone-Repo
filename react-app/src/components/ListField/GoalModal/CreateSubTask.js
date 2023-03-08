import ListItem from "../ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoalSubTaskThunk } from "../../../store/goals";

export default function CreateSubTask({ parentId }) {
  const [name, setName] = useState("");
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [date, setDate] = useState("");
  const dateOptions = {
    weekday: "short",
    year: "2-digit",
    month: "long",
    day: "numeric",
  };
  console.log(
    "checking date",
    date,
    date.slice(0, 4),
    parseInt(date.slice(5, 7)) - 1,
    date.slice(8)
  );
  console.log(
    "checking date",
    new Date(
      date.slice(0, 4),
      parseInt(date.slice(5, 7)) - 1,
      date.slice(8)
    ).toLocaleDateString("en-US", dateOptions)
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newListItem = {
      name,
      goal_id: parentId,
      due_date: new Date(
        date.slice(0, 4),
        parseInt(date.slice(5, 7)) - 1,
        date.slice(8)
      ).toLocaleDateString("en-US", dateOptions),
      priority: "4",
    };

    // Validation to check that a task isn't a character of just spaces

    const res = dispatch(addGoalSubTaskThunk(newListItem, parentId));
    if (res) console.log("checking response", res);

    setName("");
  };

  const defaultListHeight = 10;
  let displayList = [];
  if (singleGoal.sub_tasks) {
    const array = Object.values(singleGoal.sub_tasks);
    displayList = array.map((item) => (
      <ListItem subTask={true} taskBool={true} key={item.id} item={item} />
    ));
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

  return (
    <>
      <div className="goal-modal-create-sub-task-container">
        <div className="sub-task-list-input-field-container-left">
          <h4 className="goal-modal-create-sub-task-header">
            Create a sub-task:
          </h4>
          <form
            className="goal-modal-create-sub-task-form"
            onSubmit={handleSubmit}
            type="submit"
          >
            <label htmlFor="name" className="edit-task-form-labels">
              Name: <span style={{ color: "maroon" }}>*</span>
            </label>
            <input
              className="edit-form-input"
              placeholder={"Add a sub task..."}
              type="text"
              name="name"
              maxLength="50"
              required={true}
              value={name}
              onChange={handleNameChange}
            ></input>
            <label htmlFor="year" className="edit-task-form-labels">
              Set a Due Date <span style={{ color: "maroon" }}>*</span>
            </label>
            <input
              className="edit-form-date-input"
              name="year"
              required={true}
              type="date"
              min={restrictedDay}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>

            <button type="submit" className="submit-sub-task">
              Create
            </button>
          </form>
        </div>
        <div className="sub-task-list-display-right">{displayList}</div>
      </div>
    </>
  );
}
