import ListItem from "../../ReusableComponents/ListField/ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskThunk } from "../../../store/tasks";
import { useDate } from "../../../context/Date";

const dateOptions = {
  weekday: "short",
  year: "2-digit",
  month: "long",
  day: "numeric",
};

export default function CreateSubTask({ showAdd, setShowAdd }) {
  const [name, setName] = useState("");
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const [date, setDate] = useState("");
  const { fetchDates, restrictedDay } = useDate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputDate = new Date(
      date.slice(0, 4),
      parseInt(date.slice(5, 7)) - 1,
      date.slice(8)
    ).toLocaleDateString("en-US", dateOptions);

    const newListItem = {
      name,
      parent_id: singleTask.id,
      due_date: inputDate,
      priority: "4",
    };

    // Creating the string for any associated goals to be passed down to children
    if (Object.values(singleTask.goals).length) {
      const tempArray = [];
      Object.values(singleTask.goals).forEach((ele) => tempArray.push(ele.id));
      newListItem["goals"] = tempArray;
    }
    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      if (fetchDates.includes(inputDate))
        dispatch(
          addTaskThunk(
            newListItem,
            inputDate,
            inputDate.slice(0, 3).toLowerCase()
          )
        );
      else dispatch(addTaskThunk(newListItem, inputDate));
    }
    setShowAdd(false);
    setDate("");
    setName("");
  };

  const defaultListHeight = 7;
  let displayList = [];
  if (singleTask.sub_tasks) {
    const array = Object.values(singleTask.sub_tasks);
    displayList = array.map((item) => (
      <ListItem taskBool={true} indivSubTask={true} key={item.id} item={item} />
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
      <div className="goal-modal-create-sub-task-container">
        <div className="sub-task-list-display">{displayList}</div>
        {showAdd && (
          <div className="sub-task-list-input-field-container-left">
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
      {/*
      <div className="sub-task-list-input-field-container">
        <form
          className="sub-task-list-form-container"
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
            value={title}
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
      <div className="sub-task-list-display">{displayList}</div> */}
    </>
  );
}
