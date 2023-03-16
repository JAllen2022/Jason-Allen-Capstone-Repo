import { useEffect, useState, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmation from "../DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, deleteGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import GoalSummary from "./GoalSummary";
import EditGoal from "./EditGoal";
import CreateSubTask from "./CreateSubTask";
import "./GoalModal.css";

export default function GoalModal({ itemId }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [tab, setTab] = useState("summary");
  const [edit, setEdit] = useState(false);

  console.log("checking single goal", singleGoal);

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
  // else if(tab=="sub-goal") display= <SubGoals />
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
        Goal: {singleGoal.name}
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
            Reflections{" "}
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
