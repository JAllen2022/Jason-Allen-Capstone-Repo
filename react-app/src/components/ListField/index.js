import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "./ListItem";
import "./ListField.css";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../store/tasks";

export default function ListField({ taskBool, incommingList }) {
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState("all");
  const dispatch = useDispatch();

  let listToDisplay;
  useEffect(() => {
    if (tab === "all") {
      listToDisplay = incommingList.sort((x, y) => {
        if (x.completed) return 1;
        else return -1;
      });
    } else if (tab === "complete")
      listToDisplay = incommingList.filter((ele) => ele.completed);
    else if (tab === "incomplete")
      listToDisplay = incommingList.filter((ele) => !ele.completed);
  }, [tab]);

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
      <ListItem key={item.id} item={item} taskBool={taskBool} />
    ));

    if (displayList.length < defaultListHeight) {
      for (let i = displayList.length; i < defaultListHeight; i++) {
        displayList.push(<ListItem empty={true} />);
      }
    }
  }

  return (
    <div className="list-container-div">
      <div className="list-header-tab-organizer">
        <div className="list-tab-heading" onClick={() => setTab("all")}>
          All {taskBool ? "Tasks" : "Goals"}
        </div>
        <div className="list-tab-heading" onClick={() => setTab("incomplete")}>
          Incomplete
        </div>
        <div className="list-tab-heading" onClick={() => setTab("complete")}>
          Completed
        </div>
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
