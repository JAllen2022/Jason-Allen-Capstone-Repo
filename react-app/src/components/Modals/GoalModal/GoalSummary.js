import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import "./GoalModal.css";

export default function GoalSummary({ tab, setTab }) {
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [description, setDescription] = useState("");
  const descriptionAreaRef = useRef(null);

  const dispatch = useDispatch();

  const handleDescriptionSubmit = (object) => {
    dispatch(editGoalThunk(object, singleGoal.id));
  };

  // Calculating number of completed
  const completedSubGoals =
    singleGoal.sub_goals &&
    Object.values(singleGoal.sub_goals).filter((ele) => {
      console.log("checking ele", ele);
      console.log("checking ele", ele.completed);

      return ele.completed;
    }).length;
  const completedSubTasks =
    singleGoal.sub_tasks &&
    Object.values(singleGoal.sub_tasks).filter((ele) => ele.completed).length;

  const changeToParent = () => {
    dispatch(getGoalThunk(singleGoal.parent_id));
  };

  let priority;
  if (singleGoal.priority == "1")
    priority = (
      <>
        <i
          style={{ color: "#d1453a" }}
          className="fa-solid fa-flag-checkered summary-icon"
        ></i>
        <span>Priority 1</span>
      </>
    );
  else if (singleGoal.priority == "2")
    priority = (
      <>
        <i
          style={{ color: "#eb8907" }}
          className="fa-solid fa-flag-checkered summary-icon"
        ></i>
        <span>Priority 2</span>
      </>
    );
  else if (singleGoal.priority == "3")
    priority = (
      <>
        <i
          style={{ color: "#246ee0" }}
          className="fa-solid fa-flag-checkered summary-icon"
        ></i>
        <span>Priority 3</span>
      </>
    );
  else
    priority = (
      <>
        <i
          style={{ color: "rgb(156, 156, 156)" }}
          className="fa-solid fa-flag-checkered summary-icon"
        ></i>
        <span>Priority 4</span>
      </>
    );

  return (
    <div className="habit-modal-body-container">
      <div className="habit-modal-body-left">
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
              minLength="1"
              value={description || singleGoal?.description}
              rows={4}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
                handleDescriptionSubmit({
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
            <span className="parent-goal-description" onClick={changeToParent}>
              {singleGoal.parent?.name}
            </span>
          </div>
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
            <i class="fa-regular fa-newspaper habit-button-icon"></i> Summary{" "}
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
            <i class="fa-regular fa-note-sticky habit-button-icon"></i> Notes{" "}
          </div>
        </div>
        <div className="summary-item-container">
          <div className="summary-item-title">Due Date</div>
          <div className="summary-item-description">
            <i className="fa-regular fa-calendar summary-icon"></i>
            {singleGoal.due_date}
          </div>
        </div>
        <div className="summary-item-container">
          <div className="summary-item-title">Priority</div>
          <div className="summary-item-description">{priority}</div>
        </div>
        <div className="summary-item-container">
          <div className="summary-item-title">Status</div>
          <div className="summary-item-description">
            <i className="fa-solid fa-bars-progress summary-icon"></i>
            {singleGoal.completed ? "Completed" : singleGoal.status}
          </div>
        </div>
        <div className="summary-item-container">
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
        </div>
        <div className="summary-item-container-sub-task">
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
        </div>
      </div>
    </div>
  );
}
