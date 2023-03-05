import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { getTaskThunk } from "../../../store/tasks";

export default function TaskSummary() {
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const dispatch = useDispatch();
  const completedSubTasks =
    singleTask.sub_tasks &&
    Object.values(singleTask.sub_tasks).filter((ele) => ele.completed).length;

  const changeToParent = () => {
    dispatch(getTaskThunk(singleTask.parent_id));
  };

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
        {singleTask.parent_id && (
          <div className="parent-goal">
            <div>
              <span className="parent-goal-title">Parent Task: </span>
              <span
                className="parent-goal-description"
                onClick={changeToParent}
              >
                {singleTask.parent?.name}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="summary-body-container-right">
        <div className="summary-item-container">
          <div className="summary-item-title">Due Date</div>
          <div className="summary-item-description">
            <i class="fa-regular fa-calendar summary-icon"></i>
            {singleTask.due_date}
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
              {completedSubTasks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
