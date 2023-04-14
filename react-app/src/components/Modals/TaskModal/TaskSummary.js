import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import {
  editTaskThunk,
  getTaskThunk,
  getAllTasksThunk,
} from "../../../store/tasks";
import { getAllGoalsThunk } from "../../../store/goals";
import GoalModal from "../GoalModal";
import CreateSubTask from "./CreateSubTask";
import Notes from "../../ReusableComponents/Notes";
import DeleteConfirmation from "../DeleteConfirmation";
import { useDate } from "../../../context/Date";

function getDayName(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getDay();
  return days[dayIndex];
}

export default function TaskSummary() {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declare Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { closeModal, setModalContent } = useModal();
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const allGoals = useSelector((state) => state.goals.allGoals);
  const { fetchDates } = useDate();

  // useStates
  const [tab, setTab] = useState("summary");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [parentOptions, setParentOptions] = useState("");
  const [parentId, setParentId] = useState("");
  const [relatedGoal, setRelatedGoal] = useState([]);
  const [goalOptions, setGoalOptions] = useState("");
  const [existingGoals, setExistingGoals] = useState([]);
  const [showGoals, setShowGoals] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState(singleTask.description);
  const [addSubTask, setAddSubTask] = useState(false);

  const dispatch = useDispatch();
  const descriptionAreaRef = useRef(null);

  const relatedGoals =
    singleTask.goals && Object?.values(singleTask.goals).length
      ? Object.values(singleTask.goals).map((goal) => <GoalSpan goal={goal} />)
      : "";

  const completedSubTasks =
    singleTask.sub_tasks &&
    Object.values(singleTask.sub_tasks).filter((ele) => ele.completed).length;

  const changeToParent = () => {
    dispatch(getTaskThunk(singleTask.parent_id));
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handle Submits ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleGeneralSubmit = (object) => {
    if (fetchDates.includes(singleTask.due_date)) {
      if (fetchDates.includes(singleTask.due_date)) {
        dispatch(
          editTaskThunk(
            object,
            singleTask.id,
            singleTask.due_date.slice(0, 3).toLowerCase()
          )
        );
      }
    } else {
      dispatch(editTaskThunk(object, singleTask.id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Changing due date back to time in database
    const newDate = new Date(
      e.target.value.slice(0, 4),
      parseInt(e.target.value.slice(5, 7)) - 1,
      e.target.value.slice(8)
    );
    const day = newDate.getDate();
    const month = newDate.toLocaleString("default", { month: "long" });
    const year = newDate.getFullYear().toString().slice(-2);
    const newTimeStr = `${getDayName(newDate)}, ${month} ${day}, ${year}`;

    // Combining both arrays for the edit

    const goal_ids = [...existingGoals.map((ele) => ele.id), ...relatedGoal];

    let editItem = {
      ...singleTask,
      // description,
      // priority,
      // parent_id: parentId,
      // task_duration: taskDuration,
      //   assign_date: assignDate,
      due_date: newTimeStr,
      // goals: goal_ids,
      //   recurring_frequency: recurringFrequency,
      //   recurring_date: recurringDate,
      // completed: completed ? true : false,
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
  };

  // let priority;
  // if (singleTask.priority == "1")
  //   priority = (
  //     <>
  //       <i
  //         style={{ color: "#d1453a" }}
  //         className="fa-solid fa-flag-checkered summary-icon"
  //       ></i>
  //       <span>Priority 1</span>
  //     </>
  //   );
  // else if (singleTask.priority == "2")
  //   priority = (
  //     <>
  //       <i
  //         style={{ color: "#eb8907" }}
  //         className="fa-solid fa-flag-checkered summary-icon"
  //       ></i>
  //       <span>Priority 2</span>
  //     </>
  //   );
  // else if (singleTask.priority == "3")
  //   priority = (
  //     <>
  //       <i
  //         style={{ color: "#246ee0" }}
  //         className="fa-solid fa-flag-checkered summary-icon"
  //       ></i>
  //       <span>Priority 3</span>
  //     </>
  //   );
  // else
  //   priority = (
  //     <>
  //       <i
  //         style={{ color: "rgb(156, 156, 156)" }}
  //         className="fa-solid fa-flag-checkered summary-icon"
  //       ></i>
  //       <span>Priority 4</span>
  //     </>
  //   );

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

    let relatedGoals;
    let relatedGoalIds;
    if (singleTask.goals) {
      relatedGoals = Object.values(singleTask.goals);
      relatedGoalIds = Object.values(singleTask.goals).map((ele) => ele.id);
      setExistingGoals(relatedGoals);
    }
    let allGoalArray;
    if (allGoals)
      allGoalArray = Object.values(allGoals).filter((ele) => {
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
  }, [singleTask]);

  useEffect(() => {
    dispatch(getAllTasksThunk());
    dispatch(getAllGoalsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (descriptionAreaRef.current) {
      descriptionAreaRef.current.style.height = "auto";
      descriptionAreaRef.current.style.height = `${descriptionAreaRef.current.scrollHeight}px`;
    }
  }, [description]);

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
  const now = new Date();
  const yearS = now.getFullYear();
  const monthS = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = yearS + "-" + addZero(monthS) + "-" + addZero(day);

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
                  value={description || ""}
                  rows={4}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                    handleGeneralSubmit({
                      ...singleTask,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </div>

            <div className="modal-body-section-container ">
              <div className="habit-week-icon-container">
                <i class="fa-solid fa-list-check"></i>
              </div>
              <div className="habit-week-container-right">
                <div className="habit-week-container-right-heading">
                  <h3 className="habit-modal-sub-headings">Sub-Tasks</h3>
                  <i
                    class="fa-solid fa-plus add-sub"
                    onClick={() => setAddSubTask((prev) => !prev)}
                  ></i>
                </div>
                <CreateSubTask
                  showAdd={addSubTask}
                  setShowAdd={setAddSubTask}
                />
              </div>
            </div>
            {singleTask.parent_id && (
              <div className="parent-goal">
                <span className="parent-goal-title">Parent Goal: </span>
                <span
                  className="parent-goal-description"
                  onClick={changeToParent}
                >
                  {singleTask.parent?.name}
                </span>
              </div>
            )}
          </>
        ) : (
          <Notes item={singleTask} taskBool={true} />
        )}

        <div className="parent-goal">
          {relatedGoals && (
            <div>
              <span className="parent-goal-title">Achieving these goals: </span>
              {relatedGoals}
            </div>
          )}
          {singleTask.parent_id && (
            <div>
              <span className="parent-goal-title">Parent Task: </span>
              <span
                className="parent-goal-description"
                onClick={changeToParent}
              >
                {singleTask.parent?.name}
              </span>
            </div>
          )}
        </div>
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
              <label htmlFor="due-date" className="habit-modal-action-button">
                <i className="fa-regular fa-calendar habit-button-icon"></i>

                <input
                  className="priority-change-input"
                  name="due-date"
                  type="date"
                  min={restrictedDay}
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    handleSubmit(e);
                  }}
                ></input>
              </label>
              <label htmlFor="priority" className="habit-modal-action-button">
                <i className="fa-solid fa-fire habit-button-icon"></i>
                <select
                  className="priority-change-input"
                  name="priority"
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    handleGeneralSubmit({
                      ...singleTask,
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
              <label htmlFor="duration" className="habit-modal-action-button">
                <i class="fa-regular fa-clock habit-button-icon"></i>

                <select
                  className="priority-change-input"
                  name="duration"
                  value={taskDuration || ""}
                  onChange={(e) => {
                    e.preventDefault();
                    setTaskDuration(e.target.value);
                    handleGeneralSubmit({
                      ...singleTask,
                      task_duration: e.target.value,
                    });
                  }}
                >
                  {durationOptions}
                </select>
              </label>
              <label htmlFor="completed" className="habit-modal-action-button">
                <i class="fa-regular fa-square-check habit-button-icon"></i>

                <select
                  className="priority-change-input"
                  name="completed"
                  value={completed}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    handleGeneralSubmit({
                      ...singleTask,
                      completed: !completed,
                    });
                  }}
                >
                  <option value={true}>Completed </option>
                  <option value={false}>Not Completed</option>
                </select>
              </label>
              {/* <div className="summary-item-container">
              <div className="summary-item-title">Due Date</div>
              <div className="summary-item-description">
                <i className="fa-regular fa-calendar summary-icon"></i>
                {singleTask.due_date}
              </div>
            </div>
            <div className="summary-item-container">
              <div className="summary-item-title">Task Priority</div>
              <div className="summary-item-task">
                <div className="summary-item-description">{priority}</div>
              </div>
            </div> */}
              {/* <div className="summary-item-container">
          <div className="summary-item-title">Recurring [Weekly] Next:</div>
          <div className="summary-item-task">
            <div className="summary-item-description">
              <i className="fa-solid fa-arrow-rotate-right summary-icon"></i>
              {singleTask.due_date}
            </div>
          </div>
        </div> */}
              {/* <div className="summary-item-container">
              <div className="summary-item-title">Estimated Task Duration</div>
              <div className="summary-item-task">
                <div className="summary-item-description">
                  <i className="fa-solid fa-hourglass-half summary-icon"></i>
                  {singleTask.task_duration ? singleTask.task_duration : "None set"}
                </div>
              </div>
            </div>
            <div className="summary-item-container-sub-task">
              <div className="summary-item-title">Sub-Tasks</div>
              <div className="summary-item-task">
                <div className="summary-item-task-completed">
                  <i className="fa-solid fa-list-check summary-icon"></i>
                  {singleTask.sub_tasks
                    ? Object.values(singleTask.sub_tasks).length
                    : "0"}
                </div>
                <div className="summary-item-task-completed">
                  <i className="fa-regular fa-square-check summary-icon"></i>
                  {completedSubTasks ? completedSubTasks : "0"}
                </div>
              </div>
            </div> */}
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
        <div className="habit-modal-action-options">
          <div className="habit-modal-right-title">
            Actions:
            <div
              className="habit-modal-action-button"
              onClick={() =>
                setModalContent(
                  <DeleteConfirmation
                    item={singleTask}
                    instanceId={singleTask.id}
                    taskBool={true}
                  />
                )
              }
            >
              {" "}
              <i className="fa-solid fa-trash habit-button-icon"></i>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalSpan({ goal }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const changeToGoal = () => {
    setModalContent(<GoalModal itemId={goal.id} />);
  };

  return (
    <span className="parent-goal-description" onClick={changeToGoal}>
      {goal.name}{" "}
    </span>
  );
}
