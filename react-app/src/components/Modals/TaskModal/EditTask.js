import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTaskThunk, getAllTasksThunk } from "../../../store/tasks";
import { getAllGoalsThunk } from "../../../store/goals";
import { useDate } from "../../../context/Date";

import "./EditListField.css";

export default function EditGoal({ setEdit, setTab }) {
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const allGoals = useSelector((state) => state.goals.allGoals);
  const { fetchDates } = useDate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [recurringOption, setRecurringOption] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [parentOptions, setParentOptions] = useState("");
  const [parentId, setParentId] = useState("");
  const [relatedGoal, setRelatedGoal] = useState([]);
  const [goalOptions, setGoalOptions] = useState("");
  const [existingGoals, setExistingGoals] = useState([]);

  const [showGoals, setShowGoals] = useState(false);

  //   const [recurringFrequency, setRecurringFrequency] = useState("");
  //   const [recurringDate, setRecurringDate] = useState("");
  //   const [assignDate, setAssignDate] = useState("");
  const [completed, setCompleted] = useState(false);
  //   const [showMenu, setShowMenu] = useState(false);
  //   const { closeModal } = useModal();

  function getDayName(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return days[dayIndex];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Changing due date back to time in database
    const newDate = new Date(
      dueDate.slice(0, 4),
      parseInt(dueDate.slice(5, 7)) - 1,
      dueDate.slice(8)
    );
    const day = newDate.getDate();
    const month = newDate.toLocaleString("default", { month: "long" });
    const year = newDate.getFullYear().toString().slice(-2);
    const newTimeStr = `${getDayName(newDate)}, ${month} ${day}, ${year}`;

    // Combining both arrays for the edit

    const goal_ids = [...existingGoals.map((ele) => ele.id), ...relatedGoal];

    let editItem = {
      ...singleTask,
      name,
      description,
      priority,
      parent_id: parentId,
      task_duration: taskDuration,
      //   assign_date: assignDate,
      due_date: newTimeStr,
      goals: goal_ids,
      //   recurring_frequency: recurringFrequency,
      //   recurring_date: recurringDate,
      completed: completed ? true : false,
    };

    if (fetchDates.includes(newTimeStr)) {
      if (
        newTimeStr !== singleTask.due_date &&
        fetchDates.includes(singleTask.due_date)
      ) {
        const deleteFromWeek = true;
        dispatch(
          editTaskThunk(
            editItem,
            singleTask.id,
            newTimeStr.slice(0, 3).toLowerCase(),
            deleteFromWeek
          )
        );
      } else {
        dispatch(
          editTaskThunk(
            editItem,
            singleTask.id,
            newTimeStr.slice(0, 3).toLowerCase()
          )
        );
      }
    } else {
      dispatch(editTaskThunk(editItem, singleTask.id));
    }
    setTab("summary");
    setEdit(false);
  };

  const handleRemoveExistingGoal = (ele) => {
    // console.log("checking the goal id", ele.id);
    // const newExistingGoals = [...existingGoals];
    // const index = newExistingGoalsIds.indexOf(ele.id); // find the index of the item to remove
    // console.log("we got this index", index);
    // console.log("checking existing goals ids", existingGoalsIds);
    // newExistingGoalsIds.splice(index, 1);
    // console.log("checking new existing goals", newExistingGoalsIds);
    // setExistingGoals(newExistingGoals); // remove the item from the array
  };

  let displayGoals = "";
  if (existingGoals.length) {
    displayGoals = existingGoals.map((ele) => (
      <div
        key={`${ele.name}${ele.id}`}
        value={ele.id}
        className="existing-goal-divs"
      >
        <span
          className="delete-existing-goal"
          onClick={() => {
            const newExistingGoals = existingGoals.filter(
              (goal) => goal.id !== ele.id
            );
            setExistingGoals(newExistingGoals); // remove the item from the array
          }}
        >
          X
        </span>{" "}
        {ele.name}
      </div>
    ));
  }

  useEffect(() => {
    if (singleTask.id) {
      setName(singleTask.name);
      setDescription(singleTask.description);
      setPriority(singleTask.priority);
      setTaskDuration(singleTask.task_duration);
      setParentId(singleTask.parent_id);
      //   setRecurringFrequency(singleTask.recurring_frequency);
      //   setRecurringDate(singleTask.recurring_date);
      //   setAssignDate(singleTask.assign_date);
      setCompleted(singleTask.completed);

      // Changing due_date to format for input date
      const date = new Date(singleTask.due_date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const newTimeStr = `${year}-${month}-${day}`;

      setDueDate(newTimeStr);
    }

    // Filter out the current task, as well as any children tasks. These should not be options
    // to assign as a parent task
    const allTaskArray = Object.values(allTasks).filter((ele) => {
      if (ele.id === singleTask.id || ele.parent_id === singleTask.id) {
        return false;
      } else {
        return true;
      }
    });

    if (allTaskArray.length) {
      //First find the options for tasks that we are able to set as parent tasks
      const parentArray = allTaskArray.sort((x, y) => {
        if (x.name < y.name) {
          return -1;
        }
        if (x.name > y.name) {
          return 1;
        }
        return 0;
      });
      const diplayParentOptions = parentArray.map((ele) => (
        <option key={`${ele.name}${ele.id}`} value={ele.id}>
          {ele.name} | Due date: {ele.due_date}
        </option>
      ));
      setParentOptions(diplayParentOptions);
      //Find all goals that we are able to set as parents
    }
    const relatedGoals = Object.values(singleTask.goals);
    const relatedGoalIds = Object.values(singleTask.goals).map((ele) => ele.id);
    setExistingGoals(relatedGoals);

    const allGoalArray = Object.values(allGoals).filter((ele) => {
      if (relatedGoalIds.includes(ele.id)) {
        return false;
      } else {
        return true;
      }
    });
    if (allGoalArray.length) {
      const displayGoalOptions = allGoalArray.map((ele) => (
        <option key={`${ele.name}${ele.id}`} value={ele.id}>
          {ele.name} | Due date: {ele.due_date}
        </option>
      ));

      setGoalOptions(displayGoalOptions);
    }
  }, [singleTask, allTasks, allGoals]);

  useEffect(() => {
    dispatch(getAllTasksThunk());
    dispatch(getAllGoalsThunk());
  }, [dispatch]);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Formatting time constraints for google doc form
  const now = new Date();
  const yearS = now.getFullYear();
  const monthS = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = yearS + "-" + addZero(monthS) + "-" + addZero(day);
  const restrictedDateInput =
    yearS +
    "-" +
    addZero(monthS) +
    "-" +
    addZero(day) +
    "T" +
    addZero(hour) +
    ":" +
    addZero(minute);

  let yearArray = [];
  for (let i = new Date().getFullYear(); i < 2100; i++) {
    yearArray.push(i);
  }

  const getWeekStartDate = (year, weekNumber) => {
    const simple = new Date(year, 0, 2 + (weekNumber - 1) * 7);

    return simple;
  };
  const durationOptions = [
    <option value={null}>None</option>,
    <option value="15 minutes">15 minutes</option>,
    <option value="30 minutes">30 minutes</option>,
    <option value="45 minutes">45 minutes</option>,
  ];
  for (let i = 1; i < 5; i++) {
    for (let j = 0; j <= 45; j += 15) {
      const value = i * 60 + j;
      durationOptions.push(
        <option value={`${i} hours, ${j} minutes`}>
          {i} hours, {j} minutes
        </option>
      );
    }
  }

  const cancelClick = () => {
    setTab("summary");
    setEdit(false);
  };

  // Recurring Frequency Options

  return (
    <>
      <div className="edit-goal-form-left-container">
        <form className="" onSubmit={handleSubmit} type="submit">
          <div className="edit-task-form-div-field">
            <label htmlFor="name" className="edit-task-form-labels">
              Name <span style={{ color: "maroon" }}>*</span>
            </label>
            <input
              className="edit-form-input"
              // className="song-input-field"
              required
              name="name"
              minLength="1"
              maxLength="20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="edit-task-form-div-field">
            <label htmlFor="description" className="edit-task-form-labels">
              Description
            </label>
            <textarea
              className="edit-form-input"
              // className="song-input-field"
              name="description"
              maxLength="500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="edit-task-form-div-field">
            <label htmlFor="priority" className="edit-task-form-labels">
              Priority
            </label>
            <select
              className="edit-form-input"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value={null} disabled={true}>
                None
              </option>
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
            </select>
          </div>

          <div className="edit-task-form-div-field">
            <label htmlFor="duration" className="edit-task-form-labels">
              Task Duration
            </label>
            <select
              className="edit-form-input"
              name="duration"
              value={taskDuration}
              onChange={(e) => setTaskDuration(e.target.value)}
            >
              {durationOptions}
            </select>
          </div>
          <div className="edit-task-form-div-field">
            <label
              htmlFor="recurring-frequency"
              className="edit-task-form-labels"
            >
              Does this task repeat?
            </label>
            <select
              className="edit-form-input"
              name="recurring-frequency"
              value={recurringOption}
              onChange={(e) => setRecurringOption(e.target.value)}
            >
              <option value={null}>Does not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly on ____ weekday</option>
              <option value="monthly">Monthly on the (number) (weekday)</option>
              <option value="anually">Annually on (Month) (day)</option>
              <option value="weekdays">Every weekday (Monday to Friday)</option>
              <option value="custom">Custom...</option>
            </select>
          </div>

          <div className="edit-task-form-div-field">
            <label htmlFor="due-date" className="edit-task-form-labels">
              Due Date <span style={{ color: "maroon" }}>*</span>
            </label>
            <input
              className="edit-form-input"
              name="due-date"
              type="date"
              min={restrictedDay}
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            ></input>
          </div>

          <div className="edit-task-form-div-field">
            <label for="sub-tasks" className="edit-task-form-labels">
              Assign a parent task:
            </label>

            <select
              name="sub-tasks"
              value={parentId}
              className="edit-form-input"
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value={null}>None</option>
              {parentOptions}
            </select>
          </div>
          {displayGoals.length ? (
            <div className="edit-task-form-div-field">
              <label className="edit-task-form-labels">
                Current goals associated with this task:
              </label>
              {displayGoals}
            </div>
          ) : (
            ""
          )}
          <div className="edit-task-form-div-field">
            <label htmlFor="add-goal" className="edit-task-form-labels">
              Add goals related to this task?
              <label className="switch">
                <input
                  type="checkbox"
                  value={showGoals}
                  onChange={(e) =>
                    setShowGoals((prev) => {
                      if (prev) {
                        setRelatedGoal("");
                      }
                      return !prev;
                    })
                  }
                />
                <span className="slider round"></span>
              </label>
            </label>
            {showGoals && (
              <select
                className="edit-form-input"
                name="add-goal"
                multiple
                value={relatedGoal}
                onChange={(e) =>
                  setRelatedGoal(
                    Array.from(e.target.selectedOptions).map(
                      (option) => option.value
                    )
                  )
                }
              >
                <option value={null}>None</option>
                {goalOptions}
              </select>
            )}
          </div>
          <div className="edit-task-check-box-container">
            <label htmlFor="completed" className="edit-task-form-labels">
              Completed?
            </label>
            <input
              className=""
              // className="song-input-field"
              name="completed"
              checked={completed}
              type="checkbox"
              onChange={() => setCompleted((prev) => !prev)}
            />
          </div>

          <div className="edit-task-buttons">
            <div className="cancel-button" onClick={cancelClick}>
              Cancel
            </div>
            <div className="cancel-button" type="submit" onClick={handleSubmit}>
              Save
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
