import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "./ListItem";
import "./ListField.css";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../store/tasks";

// Helper function to get the week for a date object passed in
function getCurrentWeek(currentDate) {
  const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const daysFromSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
  const monday = new Date(currentDate.getTime() - daysToMonday * 86400000); // 86400000 = 1 day in milliseconds
  const sunday = new Date(currentDate.getTime() + daysFromSunday * 86400000);
  const mondayString = monday.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const sundayString = sunday.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return `Weekly Goals: ${mondayString} - ${sundayString}`;
}

export default function ListField({
  taskBool,
  incommingList,
  timeFrame,
  year,
  date,
  increase,
  decrease,
}) {
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState("all");

  // Code to determine the header to display on each column
  let displayHeader = "";
  if (timeFrame === "Year") {
    displayHeader = (
      <h4 className="list-header">
        <span className="list-header-date-buttons" onClick={decrease}>
          <i class="fa-solid fa-circle-chevron-left"></i>
        </span>
        <span className="header-timefame-text">{`${year} Goals`}</span>
        <span className="list-header-date-buttons" onClick={increase}>
          <i class="fa-solid fa-circle-chevron-right"></i>
        </span>
      </h4>
    );
  }
  if (timeFrame === "Monthly") {
    const month = date.toLocaleString("default", { month: "long" });
    displayHeader = (
      <h4 className="list-header">
        <span className="list-header-date-buttons" onClick={decrease}>
          <i class="fa-solid fa-circle-chevron-left"></i>
        </span>
        {`${month} Goals`}
        <span className="list-header-date-buttons" onClick={increase}>
          <i class="fa-solid fa-circle-chevron-right"></i>
        </span>
      </h4>
    );
  }
  if (timeFrame === "Weekly") {
    displayHeader = (
      <h4 className="list-header">
        <span className="list-header-date-buttons" onClick={decrease}>
          <i class="fa-solid fa-circle-chevron-left"></i>
        </span>
        {getCurrentWeek(date)}
        <span className="list-header-date-buttons" onClick={increase}>
          <i class="fa-solid fa-circle-chevron-right"></i>
        </span>
      </h4>
    );
  }

  const dispatch = useDispatch();

  // Generate the different lists to display
  const allTasks = incommingList.sort((x, y) => {
    if (x.completed) return 1;
    else return -1;
  });
  const incompleted = incommingList.filter((ele) => !ele.completed);
  const completed = incommingList.filter((ele) => ele.completed);

  // Determine which list to display
  let listToDisplay;
  if (tab === "all") {
    console.log("we are doing all tasks");
    listToDisplay = allTasks;
  } else if (tab === "complete") listToDisplay = completed;
  else if (tab === "incomplete") listToDisplay = incompleted;

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
      {taskBool ? <h4 className="list-header-task">All Tasks</h4> : displayHeader}
      <div className="list-header-tab-organizer">
        <div
          className="list-tab-heading"
          onClick={() => (tab === "all" ? "" : setTab("all"))}
        >
          All {taskBool ? "Tasks" : "Goals"}
        </div>
        <div
          className="list-tab-heading"
          onClick={() => (tab === "incomplete" ? "" : setTab("incomplete"))}
        >
          Incomplete
        </div>
        <div
          className="list-tab-heading"
          onClick={() => (tab === "complete" ? "" : setTab("complete"))}
        >
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
