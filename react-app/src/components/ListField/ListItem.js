import { useDispatch } from "react-redux";
import { deleteTaskThunk, editTaskThunk } from "../../store/tasks";
import OpenModalButton from "../OpenModalButton";
import EditListField from "./EditListField";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./ListField.css";

export default function ListItem({ item, empty, taskBool }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [completed, setCompleted] = useState(item?.completed || false);

  const deleteClick = () => {
    dispatch(deleteTaskThunk);
  };

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
    } else {
      // Dispatch for goals
    }
  };

  // Modal functionality
  const onClick = () => {
    setModalContent(<EditListField item={item} />);
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
          <i
            class="fa-solid fa-trash edit"
            onClick={() => dispatch(deleteTaskThunk(item.id))}
          ></i>
        </div>
      </div>
    );

  let containerStyling = "list-item-container";
  if (!empty) containerStyling += " add-pointer";
  if (item?.completed) containerStyling += " list-item-strike-through";
  return <div className={containerStyling}>{innerDiv}</div>;
}
