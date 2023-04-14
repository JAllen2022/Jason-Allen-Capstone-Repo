import ListItem from "../../ReusableComponents/ListField/ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubTask } from "../../../store/goals";
import { useDate } from "../../../context/Date";
import { addTaskThunk } from "../../../store/tasks";

export default function CreateSubTask({ showAdd, setShowAdd }) {
  const [name, setName] = useState("");
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [date, setDate] = useState("");
  const { fetchDates, restrictedDay } = useDate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dueDate = new Date(
      date.slice(0, 4),
      parseInt(date.slice(5, 7)) - 1,
      date.slice(8)
    ).toLocaleDateString("en-US", dateOptions);

    const newListItem = {
      name,
      goals: [singleGoal.id],
      due_date: dueDate,
      priority: "4",
    };

    // Validation to check that a task isn't a character of just spaces
    let response;
    if (fetchDates.includes(dueDate))
      response = await dispatch(
        addTaskThunk(newListItem, dueDate, dueDate.slice(0, 3).toLowerCase())
      );
    else response = await dispatch(addTaskThunk(newListItem, dueDate));

    dispatch(addSubTask(response));
    setShowAdd(false);
    setDate("");
    setName("");
  };

  const defaultListHeight = 7;
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
      <div id="goal-modal-sub-task-container" className="goal-modal-create-sub-task-container">
        <div className="sub-task-list-display">{displayList}</div>
        {showAdd && (
          <div className="sub-task-list-input-field-container-left">
            {/* <h4 className="goal-modal-create-sub-task-header">
              Create a sub-task:
            </h4> */}
            <form
              className="goal-modal-create-sub-task-form"
              onSubmit={handleSubmit}
              type="submit"
            >
              <div className="sub-task-input-container">
                <label htmlFor="name" className="sub-task-input-labels">
                  Name: <span style={{ color: "maroon" }}>*</span>
                  <input
                    className="sub-task-inputs"
                    placeholder={"Add a sub task..."}
                    type="text"
                    name="name"
                    maxLength="50"
                    required={true}
                    value={name}
                    onChange={handleNameChange}
                  ></input>
                </label>
                <label htmlFor="year" className="sub-task-input-labels">
                  Set a Due Date <span style={{ color: "maroon" }}>*</span>
                  <input
                    className="sub-task-inputs"
                    name="year"
                    required={true}
                    type="date"
                    min={restrictedDay}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
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
    </>
  );
}
