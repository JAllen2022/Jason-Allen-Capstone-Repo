import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "./ListItem";
import "./ListField.css";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../store/tasks";

export default function ListField({ tab, taskBool, incommingList }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  console.log("checking tab", incommingList);

  let listToDisplay;
  if (tab === "all") {
    listToDisplay = incommingList.sort((x, y) => {
      if (x.completed) return 1;
      else return -1;
    });
  } else if (tab === "complete")
    listToDisplay = incommingList.filter((ele) => ele.completed);
  else if (tab === "incomplete")
    listToDisplay = incommingList.filter((ele) => !ele.completed);

  console.log("checking list to display", listToDisplay);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newListItem = {
      name: title,
    };

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = title.split(" ").join("");
    if (title.length && emptyStringCheck) {
      if (taskBool) {
        //Dispatch create task thunk
        const res = dispatch(addTaskThunk(newListItem));
        if (res) {
          console.log("checking response", res);
        }
      } else {
        //Dispatch create goal thunk
      }
    }
    setTitle("");
  };

  // Minimum number of list items on the page set to a constant
  let displayList;
  const defaultListHeight = 17;

  if (listToDisplay) {
    displayList = listToDisplay.map((item) => (
      <ListItem key={item.id} item={item} />
    ));

    if (displayList.length < defaultListHeight) {
      for (let i = displayList.length; i < defaultListHeight; i++) {
        displayList.push(<ListItem empty={true} />);
      }
    }
  }
  // Iterate through task items, if items are less than 12, insert default

  return (
    <div className="list-container-div">
      <div className="list-header-tab-organizer">
        <NavLink className="list-tab-heading" to="/tasks/all">
          All Tasks
        </NavLink>
        <NavLink className="list-tab-heading" to="/tasks/incomplete">
          Incomplete
        </NavLink>
        <NavLink className="list-tab-heading" to="/tasks/complete">
          Completed
        </NavLink>
        <div className="list-tab-cog">
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>
      <div className="list-input-field-container">
        <form
          className="list-form-container"
          onSubmit={handleSubmit}
          type="submit"
        >
          <input
            className="list-create-list-item-input-field"
            placeholder={taskBool ? "Add a task..." : "Add a goal..."}
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
      <div className="list-view-section">{displayList}</div>
    </div>
  );
}
