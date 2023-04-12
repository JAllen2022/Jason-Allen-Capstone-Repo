import { useEffect, useState, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmation from "../DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  getGoalThunk,
  deleteGoalThunk,
  editGoalThunk,
} from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import GoalSummary from "./GoalSummary";
import EditGoal from "./EditGoal";
import CreateSubTask from "./CreateSubTask";
import Notes from "../../ReusableComponents/Notes/index.js";
import "./GoalModal.css";

export default function GoalModal({ itemId }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [tab, setTab] = useState("summary");
  const [edit, setEdit] = useState(false);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const textAreaRef = useRef(null);

  const handleNameSubmit = (object) => {
    const emptyStringCheck = object.name.split(" ").join("");
    if (object.name.length && emptyStringCheck) {
      dispatch(editGoalThunk(object, itemId));
    }
  };

  const cancelClick = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getGoalThunk(itemId));
  }, [dispatch]);

  let display = "";

  if (tab === "summary") display = <GoalSummary />;
  if (edit === true) display = <EditGoal setEdit={setEdit} setTab={setTab} />;
  if (tab === "sub-goal")
    display = <CreateSubGoal parentId={itemId} setTab={setTab} />;
  if (tab === "sub-tasks") display = <CreateSubTask parentId={itemId} />;
  if (tab === "notes") display = <Notes item={singleGoal} />;
  // else display= <Reflections />
  const deleteClick = () => {
    dispatch(deleteGoalThunk(itemId));
    closeModal();
  };

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
        <i className="fa-solid fa-bullseye"></i>
        <textarea
          ref={textAreaRef}
          className="modal-title-input"
          placeholder={"Add a task..."}
          type="text"
          minLength="1"
          value={name || singleGoal?.name}
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
              handleNameSubmit({ ...singleGoal, name: e.target.value });
            }
          }}
        ></textarea>
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
              tab === "sub-goal"
                ? "goal-tab-heading-active"
                : "goal-tab-heading"
            }
            onClick={() => {
              setTab("sub-goal");
              setEdit(false);
            }}
          >
            {" "}
            Sub-Goals{" "}
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
              tab === "notes" ? "goal-tab-heading-active" : "goal-tab-heading"
            }
            onClick={() => {
              setTab("notes");
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
              modalComponent={<DeleteConfirmation item={singleGoal} />}
            />
          </span>
        </div>
      </div>
      {display}
    </div>
  );
}
