import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import Notes from "../../ReusableComponents/Notes";
import { getCurrentWeek, useDate } from "../../../context/Date";
import "./GoalModal.css";

// Helper functions
const getWeekStartDate = (year, weekNumber) => {
  const simple = new Date(year, 0, 2 + (weekNumber - 1) * 7);

  return simple;
};

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function GoalSummary({}) {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declare Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [description, setDescription] = useState(singleGoal.description);
  const dispatch = useDispatch();
  // useStates
  const [tab, setTab] = useState("summary");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("4");
  const [date, setDate] = useState("");
  const [parentId, setParentId] = useState("");

  // References
  const descriptionAreaRef = useRef(null);
  const isMountedRef = useRef(false);

  // Inner functions
  const changeToParent = () => {
    dispatch(getGoalThunk(singleGoal.parent_id));
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handle Submits ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleGeneralSubmit = (object) => {
    console.log("checking the object", object);
    dispatch(editGoalThunk(object, singleGoal.id));
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    const date = e.target.value;

    const newDate = new Date();
    const newGoal = {
      ...singleGoal,
    };

    if (singleGoal.time_frame === "month") {
      const monthDate = new Date(
        date.slice(0, 4),
        parseInt(date.slice(5, 7)) - 1,
        1
      );
      newGoal.month = `${monthDate.toLocaleString("default", {
        month: "long",
      })}, ${newDate.getFullYear()}`;
    } else if (singleGoal.time_frame === "week") {
      // Convert week input value to date range representing the week
      const [year, weekNumber] = date.split("-W");
      const startDate = getWeekStartDate(year, weekNumber);
      newGoal.week = getCurrentWeek(startDate);
    } else {
      newGoal.year = date;
    }

    console.log("checking newGoal", newGoal);

    dispatch(editGoalThunk(newGoal, singleGoal.id));
  };

  // Calculating number of completed
  // const completedSubGoals =
  //   singleGoal.sub_goals &&
  //   Object.values(singleGoal.sub_goals).filter((ele) => {

  //     return ele.completed;
  //   }).length;
  // const completedSubTasks =
  //   singleGoal.sub_tasks &&
  //   Object.values(singleGoal.sub_tasks).filter((ele) => ele.completed).length;

  let yearArray = [];
  for (let i = new Date().getFullYear(); i < 2100; i++) {
    yearArray.push(i);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UseEffects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Define the original date string
  let initialDateString = "";

  useEffect(() => {
    setStatus(singleGoal.status);

    setPriority(singleGoal.priority);

    if (singleGoal.time_frame === "year") {
      setDate(singleGoal.year);
    }
    if (singleGoal.time_frame === "month") {
      const originalDate = singleGoal.month;

      // Split the original date string into an array of month and year
      const dateArray = originalDate.split(", ");

      // Get the month abbreviation from the month name
      const monthAbbreviation = new Date(
        Date.parse(dateArray[0] + " 1, 2022")
      ).toLocaleString("default", { month: "2-digit" });

      // Create the new date string in the format "YYYY-MM"
      const newDate = dateArray[1] + "-" + monthAbbreviation;
      setDate(newDate);
    }
    if (singleGoal.time_frame === "week") {
      // Define the original date string
      const originalDate = singleGoal.week;

      // Extract the week number and year from the original date string
      const matches = originalDate.match(/(\w+) (\d+) - (\w+) (\d+)/);
      const startDate = new Date(`${matches[1]} ${matches[2]}, 2023`);
      const year = startDate.getFullYear();
      const weekNumber = Math.ceil(
        ((startDate - new Date(`December 28, ${year - 1} 23:59:59`)) /
          86400000 +
          1) /
          7
      );

      // Create the new date string in the format "YYYY-W##"
      const newDate = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

      setDate(newDate);
    }
  }, [singleGoal]);

  return (
    <div className="habit-modal-body-container">
      <div className="habit-modal-body-left">
        {tab === "summary" ? (
          <>
            <div className="modal-body-section-container ">
              <div className="habit-week-icon-container">
                <i className="fa-solid fa-bars-staggered"></i>
              </div>
              <div className="habit-week-container-right">
                <h3 className="habit-modal-sub-headings">Description</h3>
                <textarea
                  ref={descriptionAreaRef}
                  className="description-input"
                  placeholder={"Add a more detailed description..."}
                  type="text"
                  value={description}
                  rows={4}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                    handleGeneralSubmit({
                      ...singleGoal,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </div>
            {singleGoal.parent_id && (
              <div className="parent-goal">
                <span className="parent-goal-title">Parent Goal: </span>
                <span
                  className="parent-goal-description"
                  onClick={changeToParent}
                >
                  {singleGoal.parent?.name}
                </span>
              </div>
            )}
          </>
        ) : (
          <Notes item={singleGoal} />
        )}
      </div>
      <div className="habit-modal-body-right">
        <div className="habit-modal-display-button-container">
          <div className="habit-modal-right-title">Display:</div>

          <div
            className={`habit-modal-action-button
              ${tab === "summary" ? "habit-display-tab" : ""}
            `}
            onClick={() => {
              setTab("summary");
            }}
          >
            {" "}
            <i className="fa-regular fa-newspaper habit-button-icon"></i>{" "}
            Summary{" "}
          </div>

          <div
            className={`habit-modal-action-button ${
              tab === "notes" ? "habit-display-tab" : ""
            }
            `}
            onClick={() => {
              setTab("notes");
            }}
          >
            {" "}
            <i className="fa-regular fa-note-sticky habit-button-icon"></i>{" "}
            Notes{" "}
          </div>
        </div>
        <div className="habit-modal-action-options">
          {tab === "summary" ? (
            <>
              <div className="habit-modal-right-title">Details:</div>
              <div className="habit-modal-action-button">
                <i className="fa-regular fa-calendar habit-button-icon"></i>
                {singleGoal.time_frame === "year" && (
                  <select
                    className="priority-change-input"
                    name="date"
                    type="number"
                    required={true}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      handleDateSubmit(e);
                    }}
                  >
                    <option value={null} disabled={true}></option>
                    {yearArray.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                )}
                {singleGoal.time_frame === "month" && (
                  <input
                    className="priority-change-input"
                    name="date"
                    type="month"
                    min={new Date().toISOString().slice(0, 7)}
                    required={true}
                    value={date}
                    onChange={(e) => {
                      const yearMonth = e.target.value.split("-");
                      const formattedDate = `${yearMonth[0]}-${yearMonth[1]}`;
                      setDate(formattedDate);
                      handleDateSubmit(formattedDate);
                    }}
                  />
                )}
                {singleGoal.time_frame === "week" && (
                  <>
                    <input
                      className="priority-change-input"
                      name="date"
                      type="week"
                      min={new Date().toISOString().slice(0, 7)}
                      required={true}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        handleDateSubmit(e);
                      }}
                    />
                  </>
                )}
              </div>
              <label htmlFor="priority" className="habit-modal-action-button">
                <i className="fa-solid fa-fire habit-button-icon"></i>
                <select
                  className="priority-change-input"
                  name="priority"
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    handleGeneralSubmit({
                      ...singleGoal,
                      priority: e.target.value,
                    });
                  }}
                >
                  <option value="1">🟥 Priority 1</option>
                  <option value="2">🟧 Priority 2</option>
                  <option value="3">🟦 Priority 3</option>
                  <option value="4">⬜️ No priority</option>
                </select>
              </label>
              <label htmlFor="status" className="habit-modal-action-button">
                <i className="fa-solid fa-bars-progress habit-button-icon"></i>
                <select
                  className="priority-change-input"
                  name="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    handleGeneralSubmit({
                      ...singleGoal,
                      status: e.target.value,
                      completed: e.target.value === "Completed" ? true : false,
                    });
                  }}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
            </>
          ) : (
            <>
              <div className="habit-modal-right-title">Save your progress:</div>
              <div className="habit-modal-save-note">
                The changes you make in the text area will be automatically
                saved when you click outside of it.
              </div>
            </>
          )}
        </div>
        {/* <div className="summary-item-container">
          <div className="summary-item-title">Sub-Goals</div>
          <div className="summary-item-task">
            <div className="summary-item-task-completed">
              <i className="fa-solid fa-bullseye summary-icon"></i>
              {singleGoal.sub_goals
                ? Object.values(singleGoal.sub_goals).length
                : "0"}
            </div>
            <div className="summary-item-task-completed">
              <i className="fa-regular fa-square-check summary-icon"></i>
              {completedSubGoals}
            </div>
          </div>
        </div> */}
        {/* <div className="summary-item-container-sub-task">
          <div className="summary-item-title">Sub-Tasks</div>
          <div className="summary-item-task">
            <div className="summary-item-task-completed">
              <i className="fa-solid fa-list-check summary-icon"></i>
              {singleGoal.sub_tasks
                ? Object.values(singleGoal.sub_tasks).length
                : "0"}
            </div>
            <div className="summary-item-task-completed">
              <i className="fa-regular fa-square-check summary-icon"></i>
              {completedSubTasks}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
