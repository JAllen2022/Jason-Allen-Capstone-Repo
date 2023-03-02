import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./ListField.css";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../store/tasks";
import { addGoalThunk } from "../../store/goals";

export default function ListField({
  taskBool,
  subTask,
  incommingList,
  timeFrame,
  year,
  date,
  increase,
  decrease,
  dueDate,
  week,
  monthString,
  truncate,
}) {
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState("all");

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Code to determine the header to display on each column
  let displayHeader = "";
  if (timeFrame === "year") {
    displayHeader = (
      <h4 className="list-header">
        <span className="list-header-date-buttons" onClick={decrease}>
          <i class="fa-solid fa-circle-chevron-left"></i>
        </span>
        <span className="header-timefame-text">{`${date.getFullYear()} Goals`}</span>
        <span className="list-header-date-buttons" onClick={increase}>
          <i class="fa-solid fa-circle-chevron-right"></i>
        </span>
      </h4>
    );
  }
  if (timeFrame === "month") {
    displayHeader = (
      <h4 className="list-header">
        <span className="list-header-date-buttons" onClick={decrease}>
          <i class="fa-solid fa-circle-chevron-left"></i>
        </span>
        <span className="header-timefame-text">{`${monthString} Goals`}</span>
        <span className="list-header-date-buttons" onClick={increase}>
          <i class="fa-solid fa-circle-chevron-right"></i>
        </span>
      </h4>
    );
  }
  if (timeFrame === "week") {
    displayHeader = (
      <h4 className="list-header">
        <span className="list-header-date-buttons" onClick={decrease}>
          <i class="fa-solid fa-circle-chevron-left"></i>
        </span>
        <span className="header-timefame-text">{week}</span>
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
    listToDisplay = allTasks;
  } else if (tab === "complete") listToDisplay = completed;
  else if (tab === "incomplete") listToDisplay = incompleted;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("checxking due date", dueDate);
    const newListItem = {
      name: title,
      due_date: dueDate,
    };

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = title.split(" ").join("");
    if (title.length && emptyStringCheck) {
      if (taskBool) {
        //Dispatch create task thunk
        const res = dispatch(addTaskThunk(newListItem, dueDate));
        if (res) {
          console.log("checking response", res);
        }
      } else {
        //Dispatch create goal thunk
        newListItem.time_frame = timeFrame;

        // Assign values to associate timeFrame to a specific date. I.e. Goals for 2023, Goals for February, 2023, etc.
        if (timeFrame === "year") {
          newListItem.due_date = new Date(year, 11, 31).toLocaleDateString(
            "en-US",
            dateOptions
          );
          newListItem.year = year;
        } else if (timeFrame === "month") {
          newListItem.month = `${monthString}, ${date.getFullYear()}`;
          newListItem.due_date = `${monthString}, ${date.getFullYear()}`;
        } else if (timeFrame === "week") {
          newListItem.week = week;
          newListItem.due_date = week.slice(14);
        }
        const res = dispatch(addGoalThunk(newListItem));
        if (res) {
          console.log("checking response", res);
        }
      }
    }
    setTitle("");
  };

  // Minimum number of list items on the page set to a constant
  let displayList;
  let defaultListHeight = 20;
  if (truncate) defaultListHeight = 7;
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
      {taskBool ? "" : displayHeader}
      <div className="list-header-tab-organizer">
        <div
          className={
            tab === "all" ? "list-tab-heading-active" : "list-tab-heading"
          }
          onClick={() => (tab === "all" ? "" : setTab("all"))}
        >
          All {taskBool ? "Tasks" : "Goals"}
        </div>
        <div
          className={
            tab === "incomplete"
              ? "list-tab-heading-active"
              : "list-tab-heading"
          }
          onClick={() => (tab === "incomplete" ? "" : setTab("incomplete"))}
        >
          Incomplete
        </div>
        <div
          className={
            tab === "complete" ? "list-tab-heading-active" : "list-tab-heading"
          }
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
      <div
        className={
          truncate ? "list-view-section-truncated" : "list-view-section"
        }
      >
        {displayList}
      </div>
    </div>
  );
}
