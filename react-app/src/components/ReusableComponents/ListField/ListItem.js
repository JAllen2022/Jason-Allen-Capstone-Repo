import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import TaskModal from "../../Modals/TaskModal";
import GoalModal from "../../Modals/GoalModal";
import DeleteConfirmation from "../../Modals/DeleteConfirmation";
import { editTaskThunk, getTaskThunk } from "../../../store/tasks";
import { editGoalThunk, editSubTask, getGoalThunk } from "../../../store/goals";
import { useDate } from "../../../context/Date";

import "./ListField.css";

export default function ListItem({
  item,
  empty,
  taskBool,
  subTask,
  setTab,
  subGoal,
  indivSubTask,
  weekday,
}) {
  const dispatch = useDispatch();
  const { fetchDates } = useDate();

  const currTask = useSelector((state) => state.tasks.singleTask);
  let completed = item?.completed;
  const { setModalContent } = useModal();
  let tagColor = {};

  // Eventually - need to cut down on the re-renders here when checkbox is checked
  // Many re-renders occuring here if we console.log here
  // console.log("checking currtask", currTask);
  useEffect(() => {
    if (item && currTask.id === item.id) {
      if (currTask.completed !== completed) {
        completed = currTask.completed;
      }
    }
  }, [currTask]);

  if (item?.priority == "1") {
    tagColor.borderLeft = `2px solid #d1453a`;
  } else if (item?.priority == "2") {
    tagColor.borderLeft = `2px solid #eb8907`;
  } else if (item?.priority == "3") {
    tagColor.borderLeft = `2px solid #246ee0`;
  } else {
    tagColor.borderLeft = `2px solid lightgray`;
  }

  if (item?.completed) {
    tagColor.opacity = ".5";
  }
  // Handle check box click on the right side of the container to mark something complete
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...item,
      completed: !completed,
    };
    completed = !completed;

    if (taskBool) {
      if (fetchDates.includes(item.due_date)) {
        dispatch(
          editTaskThunk(
            updatedItem,
            item.id,
            item.due_date.slice(0, 3).toLowerCase()
          )
        );
        console.log(
          "checking due date",
          item.due_date,
          fetchDates.includes(item.due_date)
        );
      }

      dispatch(editTaskThunk(updatedItem, item.id, weekday));
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
        dispatch(getTaskThunk(item.id));
        setTab("summary");
      } else setModalContent(<TaskModal itemId={item.id} />);
    } else {
      if (subGoal) {
        dispatch(getGoalThunk(item.id));
        setTab("summary");
      } else setModalContent(<GoalModal itemId={item.id} />);
    }
  };

  const deleteClick = () => {
    setModalContent(
      <DeleteConfirmation
        item={item}
        taskBool={taskBool}
        subTask={subTask}
        weekday={weekday}
      />
    );
  };

  let innerDiv;

  if (!empty)
    innerDiv = (
      <div style={tagColor} className={`inner-list-item-text-container`}>
        <div className="inner-list-item-text" onClick={onClickName}>
          {item.name}{" "}
        </div>
        <div className="inner-list-edit-buttons-container">
          <form className="list-edit-button-checkbox-form">
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
          <i className="fa-solid fa-trash edit" onClick={deleteClick}></i>
        </div>
      </div>
    );

  let containerStyling = "list-item-container";
  if (!empty) containerStyling += " add-pointer";
  if (item?.completed) containerStyling += " list-item-strike-through";
  return <div className={containerStyling}>{innerDiv}</div>;
}
