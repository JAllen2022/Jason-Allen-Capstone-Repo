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

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [name]);

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
            {nameError && <div style={{ color: "maroon" }}>**{nameError}</div>}
            <input
              type="submit"
              style={{ position: "absolute", display: "none" }}
            />
          </form>

          <div className="habit-under-title-div">
            in Goals for the week of {singleGoal?.week?.slice(14)}
          </div>
        </div>
      </div>
      <GoalSummary />
    </div>
  );
}
