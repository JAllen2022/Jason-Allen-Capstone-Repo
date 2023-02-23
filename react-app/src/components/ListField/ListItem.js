import { useDispatch } from "react-redux";
import { deleteTaskThunk } from "../../store/tasks";
import OpenModalButton from "../OpenModalButton";
import EditListField from "./EditListField";
import "./ListField.css";

export default function ListItem({ item, empty }) {
  const dispatch = useDispatch();
  const deleteClick = () => {
    dispatch(deleteTaskThunk);
  };

  let innerDiv;
  if (!empty)
    innerDiv = (
      <div className="inner-list-item-text-container tag-color">
        <div className="inner-list-item-text">{item.name} </div>
        <div className="inner-list-edit-buttons-container">
          <OpenModalButton
            className="inner-list-open-modal-button"
            buttonText={<i class="fa-regular fa-pen-to-square edit"></i>}
            modalComponent={<EditListField item={item} />}
          />
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
  return <div className={containerStyling}> {innerDiv}</div>;
}
