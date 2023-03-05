import ListItem from "../ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskThunk } from "../../../store/tasks";

export default function CreateSubTask({ parentId, setTab }) {
  const [name, setName] = useState("");
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const [date, setDate] = useState("");
  const dateOptions = {
    weekday: "short",
    year: "2-digit",
    month: "long",
    day: "numeric",
  };
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
      parent_id: parentId,
      due_date: inputDate,
    };

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      const res = dispatch(addTaskThunk(newListItem, inputDate));
      if (res) console.log("checking response", res);
    }
    setName("");
    setDate("");
  };

  const defaultListHeight = 13;
  let displayList = [];
  if (singleTask.sub_tasks) {
    const array = Object.values(singleTask.sub_tasks);
    displayList = array.map((item) => (
      <ListItem
        taskBool={true}
        indivSubTask={true}
        key={item.id}
        item={item}
        setTab={setTab}
      />
    ));
  }
  if (displayList.length < defaultListHeight) {
    for (let i = displayList.length; i < defaultListHeight; i++) {
      displayList.push(<ListItem empty={true} />);
    }
  }

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
