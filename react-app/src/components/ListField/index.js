import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./ListField.css";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../store/tasks";

export default function ListField({ taskBool, incommingList }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const filteredComplete = incommingList.filter((ele) => ele.complete);
  const filteredNotComplete = incommingList.filter((ele) => !ele.complete);

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

  // Minimum number of list items on the page is 12
  let displayList;
  const defaultListHeight = 18;

  if (incommingList) {
    displayList = incommingList.map((item) => (
      <ListItem key={item.id} item={item} />
    ));

    if (displayList.length < 12) {
      for (let i = displayList.length; i < defaultListHeight; i++) {
        displayList.push(<ListItem empty={true} />);
      }
    }
  }
  // Iterate through task items, if items are less than 12, insert default

  return (
    <div className="list-container-div">
      <div className="list-header-tab-organizer">
        <div className="list-tab-heading">All Tasks</div>
        <div className="list-tab-heading">Incomplete</div>
        <div className="list-tab-heading">Completed</div>
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
