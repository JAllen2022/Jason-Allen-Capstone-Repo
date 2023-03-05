import { useDispatch, useSelector } from "react-redux";
import { deleteTaskThunk, editTaskThunk, getTask } from "../../store/tasks";
import OpenModalButton from "../OpenModalButton";
import EditTask from "./TaskModal";
import GoalModal from "./GoalModal";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import {
  deleteGoalThunk,
  editGoalThunk,
  editSubTask,
  deleteGoalSubTask,
  getGoalThunk,
} from "../../store/goals";
import "./ListField.css";
import DeleteConfirmation from "../DeleteConfirmation";

export default function ListItem({
  item,
  empty,
  taskBool,
  subTask,
  setTab,
  subGoal,
  indivSubTask,
}) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const currTask = useSelector((state) => state.tasks.singleTask);
  const [completed, setCompleted] = useState(item?.completed || false);
  const { modalRef, closeModal } = useModal();
  let tagColor = "lightgray";

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
  if (item?.priority == "1") {
    tagColor = "#d1453a";
  } else if (item?.priority == "2") {
    tagColor = "#eb8907";
  } else if (item?.priority == "3") {
    tagColor = "#246ee0";
  }
  console.log("checking tag color:", tagColor);

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
  const onClickName = () => {
    if (taskBool) {
      if (indivSubTask) {
        dispatch(getTask(item));
      }
      setModalContent(<EditTask itemId={item.id} />);
    } else {
      if (subGoal) {
        dispatch(getGoalThunk(item.id));
        setTab("summary");
      }
      setModalContent(<GoalModal itemId={item.id} />);
    }
  };

  const deleteClick = () => {
    setModalContent(
      <DeleteConfirmation item={item} taskBool={taskBool} subTask={subTask} />
    );
  };

  let innerDiv;

  if (!empty)
    innerDiv = (
      <div
        style={{ borderLeft: `2px solid ${tagColor}` }}
        className={`inner-list-item-text-container`}
      >
        <div className="inner-list-item-text" onClick={onClickName}>
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
