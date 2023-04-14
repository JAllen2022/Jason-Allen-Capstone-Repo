import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editTaskThunk, getTaskThunk } from "../../../store/tasks";
import GoalModal from "../GoalModal";
import CreateSubTask from "./CreateSubTask";
import Notes from "../../ReusableComponents/Notes";

export default function TaskSummary() {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declare Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const singleTask = useSelector((state) => state.tasks.singleTask);
  // useStates
  const [tab, setTab] = useState("summary");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(singleTask.description);
  const [addSubTask, setAddSubTask] = useState(false);

  const dispatch = useDispatch();
  const descriptionAreaRef = useRef(null);

  const relatedGoals =
    singleTask.goals && Object.values(singleTask.goals).length
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
    dispatch(editTaskThunk(object, singleTask.id));
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
          <Notes item={singleTask} />
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
        {tab === "summary" ? (
          <>
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
              The changes you make in the text area will be automatically saved
              when you click outside of it.
            </div>
          </>
        )}
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
