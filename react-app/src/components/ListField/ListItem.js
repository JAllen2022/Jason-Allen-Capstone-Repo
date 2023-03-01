import { useDispatch, useSelector } from "react-redux";
import { deleteTaskThunk, editTaskThunk } from "../../store/tasks";
import OpenModalButton from "../OpenModalButton";
import EditTask from "./TaskModal";
import EditGoal from "./GoalModal";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import "./ListField.css";
import {
  deleteGoalThunk,
  editGoalThunk,
  editSubTask,
  deleteGoalSubTask,
} from "../../store/goals";

export default function ListItem({ item, empty, taskBool, subTask }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const currTask = useSelector((state) => state.tasks.singleTask);
  const [completed, setCompleted] = useState(item?.completed || false);

  // Eventually - need to cut down on the re-renders here when checkbox is checked
  // Many re-renders occuring here if we console.log here
  // console.log("checking currtask", currTask);
  useEffect(() => {
    if (item && currTask.id === item.id) {
      if (currTask.completed !== completed) {
        setCompleted(currTask.completed);
      }
    }
  }, [currTask]);

  // Handle check box click on the right side of the container to mark something complete
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompleted((prev) => !prev);
    const updatedItem = {
      ...item,
      completed: !completed,
    };

    if (taskBool) {
      dispatch(editTaskThunk(updatedItem, item.id));
      if (subTask) {
        dispatch(editSubTask(updatedItem));
      }
    } else {
      // Dispatch for goals
      dispatch(editGoalThunk(updatedItem, item.id));
    }
  };

  // Modal functionality
  const onClick = () => {
    if (taskBool) setModalContent(<EditTask itemId={item.id} />);
    else setModalContent(<EditGoal itemId={item.id} />);
  };

  const deleteClick = () => {
    if (taskBool) dispatch(deleteTaskThunk(item.id));
    // This is to handle sub tasks that are a subtask of a task
    else dispatch(deleteGoalThunk(item.id));
    // Deleteing tasks that are a subtask of a goal
    if (subTask) dispatch(deleteGoalSubTask(item));
  };

  let innerDiv;
  if (!empty)
    innerDiv = (
      <div className="inner-list-item-text-container tag-color">
        <div className="inner-list-item-text" onClick={onClick}>
          {item.name}{" "}
        </div>
        <div className="inner-list-edit-buttons-container">
          <form
            onSubmit={handleSubmit}
            className="list-edit-button-checkbox-form"
          >
            <input
              type="checkbox"
              checked={completed}
              className="edit"
              id="list-edit-button-checkbox"
              onChange={handleSubmit}
            ></input>
            <input
              type="submit"
              style={{ position: "absolute", display: "none" }}
            />
          </form>
          <i class="fa-solid fa-trash edit" onClick={deleteClick}></i>
        </div>
      </div>
    );

  let containerStyling = "list-item-container";
  if (!empty) containerStyling += " add-pointer";
  if (item?.completed) containerStyling += " list-item-strike-through";
  return <div className={containerStyling}>{innerDiv}</div>;
}
