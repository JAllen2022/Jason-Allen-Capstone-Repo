import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./ListItem";
import { addTaskThunk } from "../../../store/tasks";
import { addGoalThunk } from "../../../store/goals";
import { editUserThunk } from "../../../store/session";
import "./ListField.css";

export default function ListField({
  taskBool,
  incomingList,
  timeFrame,
  year,
  date,
  displayHeader,
  dueDate,
  week,
  monthString,
  truncate,
  defaultFilter,
}) {
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState("all");
  const [filter, setFilter] = useState(defaultFilter || "priority");
  const [showMenu, setShowMenu] = useState(false);
  const [allTasks, setAllTasks] = useState("");
  const [incompleted, setIncompleted] = useState("");
  const [completedTasks, setCompletedTasks] = useState("");
  const dispatch = useDispatch();
  const [displayList, setDisplayList] = useState([]);
  const menuRef = useRef();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Code to determine the header to display on each column

  // Generate the different lists to display
  useEffect(() => {
    let allTasksCompleted = [];
    let allTasksNotCompleted = [];
    if (filter === "alphabetical") {
      allTasksNotCompleted = incomingList
        .filter((ele) => !ele.completed)
        .sort((x, y) => {
          // Sort by name in ascending order (case-insensitive)
          if (x.name.toLowerCase() > y.name.toLowerCase()) {
            return 1;
          } else if (x.name.toLowerCase() < y.name.toLowerCase()) {
            return -1;
          }
        });

      allTasksCompleted = incomingList
        .filter((ele) => ele.completed)
        .sort((x, y) => {
          // Sort by name in ascending order (case-insensitive)
          if (x.name.toLowerCase() > y.name.toLowerCase()) {
            return 1;
          } else if (x.name.toLowerCase() < y.name.toLowerCase()) {
            return -1;
          }
        });
    } else if (filter === "priority") {
      const priorities = [1, 2, 3, 4];
      const prioritySorted = priorities.map((prio) => {
        return incomingList
          .filter((ele) => ele.priority === prio.toString() && !ele.completed)
          .sort((x, y) =>
            x.name.localeCompare(y.name, undefined, { sensitivity: "base" })
          );
      });

      const prioritySortedCompleted = priorities.map((prio) => {
        return incomingList
          .filter((ele) => ele.priority === prio.toString() && ele.completed)
          .sort((x, y) =>
            x.name.localeCompare(y.name, undefined, { sensitivity: "base" })
          );
      });
      prioritySorted.forEach((ele) => allTasksNotCompleted.push(...ele));
      prioritySortedCompleted.forEach((ele) => allTasksCompleted.push(...ele));
    }

    setAllTasks([...allTasksNotCompleted, ...allTasksCompleted]);
    setIncompleted(allTasksNotCompleted);
    setCompletedTasks(allTasksCompleted);
  }, [filter, incomingList]);

  useEffect(() => {
    let listToDisplay;
    if (tab === "all") {
      listToDisplay = allTasks;
    } else if (tab === "complete") listToDisplay = completedTasks;
    else if (tab === "incomplete") listToDisplay = incompleted;

    let newDisplayList;
    // Minimum number of list items on the page set to a constant
    let defaultListHeight = 17;
    if (truncate) defaultListHeight = 7;
    if (listToDisplay) {
      newDisplayList = listToDisplay.map((item) => (
        <ListItem
          key={`${item.name}${item.id}`}
          item={item}
          taskBool={taskBool}
        />
      ));

      if (newDisplayList.length < defaultListHeight) {
        for (let i = newDisplayList.length; i < defaultListHeight; i++) {
          newDisplayList.push(<ListItem empty={true} />);
        }
      }
    }
    setDisplayList(newDisplayList);
  }, [tab, allTasks]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListItem = {
      name: title,
      due_date: dueDate,
      priority: "4",
    };

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = title.split(" ").join("");
    if (title.length && emptyStringCheck) {
      if (taskBool) {
        //Dispatch create task thunk
        const res = dispatch(addTaskThunk(newListItem, dueDate));
      } else {
        //Dispatch create goal thunk
        newListItem.time_frame = timeFrame;
        newListItem.status = "Not started";

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
      }
      setTitle("");
    }
  };

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
        <div id="list-tab-cog" className="list-tab-cog">
          <i
            onClick={() => setShowMenu((prev) => !prev)}
            className="fa-solid fa-gear"
          ></i>

          {showMenu && (
            <div
              ref={menuRef}
              id="filter-menu"
              className="list-tab-filter-menu-container"
            >
              <div
                className="list-tab-filter-ele"
                onClick={() => {
                  if (filter != "alphabetical") {
                    setFilter("alphabetical");
                    const newUser = { ...user };
                    if (taskBool) {
                      newUser.task_filter = "alphabetical";
                    } else if (timeFrame === "year") {
                      newUser.goal_year_filter = "alphabetical";
                    } else if (timeFrame === "month") {
                      newUser.goal_month_filter = "alphabetical";
                    } else if (timeFrame === "week") {
                      newUser.goal_week_filter = "alphabetical";
                    }
                    dispatch(editUserThunk(newUser));
                  }
                }}
              >
                <span className="list-tab-filter-check">
                  {filter === "alphabetical" ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    ""
                  )}
                </span>
                Sort by task name
              </div>
              <div
                className="list-tab-filter-ele"
                onClick={() => {
                  console.log("doing things");
                  if (filter != "priorty") {
                    setFilter("priority");
                    const newUser = { ...user };
                    if (taskBool) {
                      newUser.task_filter = "priority";
                    } else if (timeFrame === "year") {
                      newUser.goal_year_filter = "priority";
                    } else if (timeFrame === "month") {
                      newUser.goal_month_filter = "priority";
                    } else if (timeFrame === "week") {
                      newUser.goal_week_filter = "priority";
                    }
                    dispatch(editUserThunk(newUser));
                  }
                }}
              >
                <span className="list-tab-filter-check">
                  {" "}
                  {filter === "priority" ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    ""
                  )}
                </span>
                Sort by priority
              </div>
            </div>
          )}
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
            minLength="1"
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
