import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteGoalThunk, deleteGoalSubTask } from "../../../store/goals";
import { deleteTaskThunk } from "../../../store/tasks";
import "./DeleteConfirmation.css";
import { deleteHabitThunk } from "../../../store/habits";
import { useState } from "react";

export default function DeleteConfirmation({
  item,
  taskBool,
  habit,
  instanceId,
  habitBool,
  subTask,
  weekday,
}) {
  const [deleteSingleInstance, setDeleteSingleInstance] = useState(true);
  const [deleteAllInstances, setDeleteAllInstances] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const deleteObject = () => {
    if (taskBool) {
      dispatch(deleteTaskThunk(item.id, weekday));
    } else if (habitBool) {
      const deleteString = deleteSingleInstance ? "single" : "all";
      if (deleteString === "single")
        dispatch(deleteHabitThunk(instanceId, deleteString));
      else dispatch(deleteHabitThunk(item.id, deleteString, instanceId));
    } else {
      dispatch(deleteGoalThunk(item.id));
    }
    if (subTask) {
      dispatch(deleteGoalSubTask(item));
    }
    closeModal();
  };

  let title = "";
  if (taskBool) title = "task";
  else if (habitBool) title = "habit";
  else title = "goal";
  const showRadio = item?.weeks_tracked > 1;
  return (
    <div className="delete-modal-container">
      <h1 className="delete-modal-inner-text-title">
        Are you sure you want to delete your {title}: {item.name}?
      </h1>
      {showRadio && (
        <div className="delete-radio-button-container">
          <div className="radio-button">
            <input
              type="radio"
              id="radio-single"
              name="radio"
              disabled={item?.weeks_tracked <= 1}
              checked={deleteSingleInstance}
              onChange={() => {
                setDeleteSingleInstance((prev) => !prev);
                setDeleteAllInstances((prev) => !prev);
              }}
            />
            <label for="radio-single" className="radio-label">
              Delete single instance
            </label>
          </div>
          <div className="radio-button">
            <input
              type="radio"
              id="radio-all"
              name="radio"
              checked={deleteAllInstances}
              onChange={() => {
                setDeleteAllInstances((prev) => !prev);
                setDeleteSingleInstance((prev) => !prev);
              }}
            />
            <label for="radio-all" className="radio-label">
              Delete all instances
            </label>
          </div>
        </div>
      )}
      <div className="delete-modal-button-options">
        <div className="delete-modal-button" onClick={() => closeModal()}>
          Cancel
        </div>
        <div className="delete-modal-button" onClick={deleteObject}>
          Delete
        </div>
      </div>
    </div>
  );
}
