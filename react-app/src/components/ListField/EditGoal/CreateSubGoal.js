import ListItem from "../ListItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskThunk } from "../../../store/tasks";

export default function CreateSubGoal({ parentId }) {
  const [title, setTitle] = useState("");
  const singleTask = useSelector((state) => state.tasks.singleTask);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newListItem = {
      name: title,
      parent_id: parentId,
    };

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = title.split(" ").join("");
    if (title.length && emptyStringCheck) {
      const res = dispatch(addTaskThunk(newListItem));
      if (res) console.log("checking response", res);
    }
    setTitle("");
  };

  const defaultListHeight = 10;
  let displayList = [];
  if (singleTask.sub_tasks) {
    const array = Object.values(singleTask.sub_tasks);
    displayList = array.map((item) => <ListItem key={item.id} item={item} />);
  }
  if (displayList.length < defaultListHeight) {
    for (let i = displayList.length; i < defaultListHeight; i++) {
      displayList.push(<ListItem empty={true} />);
    }
  }

  return (
    <>
      <div className="sub-task-list-input-field-container">
        <form
          className="sub-task-list-form-container"
          onSubmit={handleSubmit}
          type="submit"
        >
          <input
            className="list-create-list-item-input-field"
            placeholder={"Add a sub task..."}
            type="text"
            maxLength="50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            type="submit"
            style={{ position: "absolute", display: "none" }}
          />
        </form>
      </div>
      <div className="sub-task-list-display">{displayList}</div>
    </>
  );
}
