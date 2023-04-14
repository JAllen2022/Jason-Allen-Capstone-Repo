import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTaskThunk, getTaskThunk } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateSubTask from "./CreateSubTask";
import TaskSummary from "./TaskSummary";
import EditTask from "./EditTask";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmation from "../DeleteConfirmation";
import "./EditListField.css";
import Notes from "../../ReusableComponents/Notes";

export default function EditListField({ itemId }) {
  const [showMenu, setShowMenu] = useState(false);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const textAreaRef = useRef(null);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singleTask = useSelector((state) => state.tasks.singleTask);

  const ulRef = useRef();

  const handleNameSubmit = (object) => {
    const emptyStringCheck = object.name.split(" ").join("");
    if (object.name.length && emptyStringCheck) {
      dispatch(editTaskThunk(object, itemId));
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [name]);

  // Formatting time constraints for google doc form
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = year + "-" + addZero(month) + "-" + addZero(day);
  const restrictedDateInput =
    year +
    "-" +
    addZero(month) +
    "-" +
    addZero(day) +
    "T" +
    addZero(hour) +
    ":" +
    addZero(minute);

  useEffect(() => {
    dispatch(getTaskThunk(itemId));
  }, [dispatch]);

  let display = "";

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="edit-goal-form-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
      </div>
      <div className="habit-modal-title-container">
        <div className="habit-modal-title-icon-left">
          <i id="habit-star-icon" className="fa-solid fa-bullseye"></i>
        </div>
        <div className="habit-modal-title-container-right">
          <form className="modal-title-form-container" type="submit">
            <textarea
              ref={textAreaRef}
              className="modal-title-input"
              placeholder={"Add a task..."}
              type="text"
              minLength="1"
              value={name || singleTask?.name}
              rows={1}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim().length === 0) {
                  setNameError("Name must not be empty or only spaces.");
                } else {
                  setNameError("");
                }
              }}
              onBlur={(e) => {
                e.preventDefault();
                if (nameError) {
                  e.preventDefault();
                } else {
                  setName(e.target.value);
                  handleNameSubmit({ ...singleTask, name: e.target.value });
                }
              }}
            ></textarea>
            {nameError && <div style={{ color: "maroon" }}>**{nameError}</div>}
            <input
              type="submit"
              style={{ position: "absolute", display: "none" }}
            />
          </form>

          <div className="habit-under-title-div">
            in Tasks for {singleTask.due_date}
          </div>
        </div>
      </div>
      <TaskSummary />
    </div>
    // <h1 className="edit-goal-form-container-title">
    //   Task: {singleTask.name}
    // </h1>
    // <div className="edit-goal-form-nav-container">
    //   <div className="edit-goal-left-nav">
    //     <div
    //       className={
    //         tab === "summary" ? "goal-tab-heading-active" : "goal-tab-heading"
    //       }
    //       onClick={() => {
    //         setTab("summary");
    //       }}
    //     >
    //       {" "}
    //       Summary{" "}
    //     </div>

    //     <div
    //       className={
    //         tab === "notes" ? "goal-tab-heading-active" : "goal-tab-heading"
    //       }
    //       onClick={() => {
    //         setTab("notes");
    //       }}
    //     >
    //       {" "}
    //       Notes{" "}
    //     </div>
    //   </div>

    /* <div
          className={
            edit ? "goal-tab-heading-square" : "edit-goal-button-square"
          }
        >
          <i
            onClick={() => {
              setEdit(true);
              setTab("edit");
            }}
            className="fa-regular fa-pen-to-square goal-edit"
          ></i>
          <span>
            <OpenModalButton
              buttonText={
                <i
                  className="fa-solid fa-trash"
                  // onClick={deleteClick}
                ></i>
              }
              onItemClick={closeMenu}
              className="goal-delete"
              modalComponent={
                <DeleteConfirmation item={singleTask} taskBool={true} />
              }
            />
          </span>
        </div> */
    // </div>
    //   {display}
    // </div>
  );
  //   <div className="edit-task-form-container">
  //     <div className="x-marks-the-spot">
  //       {" "}
  //       <i onClick={closeModal} class="fa-solid fa-x x-close"></i>
  //     </div>
  //     <div className="edit-task-title-container">
  //       <h1 className="edit-task-form-container-title">
  //         Edit Task: {singleTask.name}
  //       </h1>
  //       <div className="delete-single-task">
  //         <OpenModalButton
  //           buttonText={
  //             <i
  //               className="fa-solid fa-trash"
  //               // onClick={deleteClick}
  //             ></i>
  //           }
  //           onItemClick={closeMenu}
  //           className="goal-delete"
  //           modalComponent={
  //             <DeleteConfirmation item={singleTask} taskBool={true} />
  //           }
  //         />
  //       </div>
  //     </div>
  //     <div className="edit-task-form-body-container">
  //       <div className="edit-task-form-left-container">

  //       </div>
  //       <div className="edit-task-form-right-container">
  //         <div className="edit-sub-task-create-subtasks-container">
  //           <h4 className="create-subtask-header">Create a SubTask</h4>
  //           <CreateSubTask parentId={singleTask.id} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
