import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk } from "../../../store/goals";
import "./GoalModal.css";

export default function GoalSummary() {
  const singleGoal = useSelector((state) => state.goals.singleGoal);

  const dispatch = useDispatch();

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
    <div className="summary-page-container">
      <div className="summary-body-container-left">
        <div className="description-container">
          {singleGoal.description ? (
            singleGoal.description
          ) : (
            <span>
              <i className="fa-solid fa-bars-staggered summary-icon"></i>
              Description
            </span>
          )}
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
      <div className="summary-body-container-right">
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
