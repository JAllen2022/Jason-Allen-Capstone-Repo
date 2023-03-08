import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { getTaskThunk } from "../../../store/tasks";
import { getGoalThunk } from "../../../store/goals";
import GoalModal from "../GoalModal";

export default function TaskSummary() {
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const dispatch = useDispatch();
  const completedSubTasks =
    singleTask.sub_tasks &&
    Object.values(singleTask.sub_tasks).filter((ele) => ele.completed).length;

  const changeToParent = () => {
    dispatch(getTaskThunk(singleTask.parent_id));
  };

  console.log("checking single goals", singleTask);

  const relatedGoals =
    singleTask.goals && Object.values(singleTask.goals).length
      ? Object.values(singleTask.goals).map((goal) => <GoalSpan goal={goal} />)
      : "";

  return (
    <div className="summary-page-container">
      <div className="summary-body-container-left">
        <div className="description-container">
          {singleTask.description ? (
            singleTask.description
          ) : (
            <span>
              <i class="fa-solid fa-bars-staggered summary-icon"></i>Description
            </span>
          )}
        </div>

        <div className="parent-goal">
          {relatedGoals && (
            <div>
              <span className="parent-goal-title">Related Goals: </span>
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
      <div className="summary-body-container-right">
        <div className="summary-item-container">
          <div className="summary-item-title">Due Date</div>
          <div className="summary-item-description">
            <i class="fa-regular fa-calendar summary-icon"></i>
            {singleTask.due_date}
          </div>
        </div>
        <div className="summary-item-container">
          <div className="summary-item-title">Estimated Task Duration</div>
          <div className="summary-item-task">
            <div className="summary-item-description">
              <i class="fa-solid fa-hourglass-half summary-icon"></i>
              {singleTask.task_duration ? singleTask.task_duration : "None set"}
            </div>
          </div>
        </div>
        <div className="summary-item-container-sub-task">
          <div className="summary-item-title">Sub-Tasks</div>
          <div className="summary-item-task">
            <div className="summary-item-task-completed">
              <i class="fa-solid fa-list-check summary-icon"></i>
              {singleTask.sub_tasks
                ? Object.values(singleTask.sub_tasks).length
                : "0"}
            </div>
            <div className="summary-item-task-completed">
              <i class="fa-regular fa-square-check summary-icon"></i>
              {completedSubTasks ? completedSubTasks : "0"}
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
      {goal.name}
    </span>
  );
}
