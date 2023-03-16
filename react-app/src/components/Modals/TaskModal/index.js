import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskThunk } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateSubTask from "./CreateSubTask";
import TaskSummary from "./TaskSummary";
import EditTask from "./EditTask";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmation from "../DeleteConfirmation";
import "./EditListField.css";

export default function EditListField({ itemId }) {
  const [showMenu, setShowMenu] = useState(false);

  const [tab, setTab] = useState("summary");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singleTask = useSelector((state) => state.tasks.singleTask);

  const ulRef = useRef();

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

  if (tab === "summary") display = <TaskSummary />;
  if (edit === true) display = <EditTask setEdit={setEdit} setTab={setTab} />;
  if (tab === "sub-tasks")
    display = <CreateSubTask parentId={itemId} setTab={setTab} />;

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
      <h1 className="edit-goal-form-container-title">
        Task: {singleTask.name}
      </h1>
      <div className="edit-goal-form-nav-container">
        <div className="edit-goal-left-nav">
          <div
            className={
              tab === "summary" ? "goal-tab-heading-active" : "goal-tab-heading"
            }
            onClick={() => {
              setTab("summary");
              setEdit(false);
            }}
          >
            {" "}
            Summary{" "}
          </div>

          <div
            className={
              tab === "sub-tasks"
                ? "goal-tab-heading-active"
                : "goal-tab-heading"
            }
            onClick={() => {
              setTab("sub-tasks");
              setEdit(false);
            }}
          >
            {" "}
            Sub-Tasks{" "}
          </div>
          <div
            className={
              tab === "reflections"
                ? "goal-tab-heading-active"
                : "goal-tab-heading"
            }
            onClick={() => {
              setTab("reflections");
              setEdit(false);
            }}
          >
            {" "}
            Notes{" "}
          </div>
        </div>

        <div
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
        </div>
      </div>
      {display}
    </div>
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
