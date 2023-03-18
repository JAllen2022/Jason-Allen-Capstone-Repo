import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteGoalThunk, deleteGoalSubTask } from "../../../store/goals";
import { deleteTaskThunk } from "../../../store/tasks";
import "./DeleteConfirmation.css";

export default function DeleteConfirmation({
  item,
  taskBool,
  subTask,
  weekday,
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const deleteObject = () => {
    if (taskBool) {
      dispatch(deleteTaskThunk(item.id, weekday));
    } else {
      dispatch(deleteGoalThunk(item.id));
    }
    if (subTask) {
      dispatch(deleteGoalSubTask(item));
    }
    closeModal();
  };

  let title = "";
  if (taskBool) {
    title = `Are you sure you want to delete your task: ${item.name}?`;
  } else {
    title = `Are you sure you want to delete your goal: ${item.name}?`;
  }

  return (
    <div className="delete-modal-container">
      <h1 className="delete-modal-inner-text-title">{title}</h1>
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
