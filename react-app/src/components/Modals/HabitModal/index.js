import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useModal } from "../../../context/Modal";
import { getHabitThunk } from "../../../store/habits";
import DeleteConfirmation from "../DeleteConfirmation";
import OpenModalButton from "../OpenModalButton";
import "./HabitModal.css";

export default function HabitModal({ habitId }) {
  const habit = useSelector((state) => state.habits.habit);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const [tab, setTab] = useState("summary");
  const [edit, setEdit] = useState(false);

  const { closeModal, setModalContent } = useModal();
  const cancelClick = () => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHabitThunk(habitId));
  }, [dispatch]);

  return (
    <div className="edit-goal-form-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
      </div>
      <h1 className="edit-goal-form-container-title">Habit: {habit.name}</h1>
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
              modalComponent={<DeleteConfirmation item={habit} />}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
