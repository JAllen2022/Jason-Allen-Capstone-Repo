import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import GoalSummary from "./GoalSummary";
import EditGoal from "./EditGoal";
import "./EditGoal.css";

export default function GoalModal({ itemId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [tab, setTab] = useState("summary");
  const [edit, setEdit] = useState(false);

  const cancelClick = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getGoalThunk(itemId));
  }, [dispatch]);

  let display = "";

  if (tab === "summary") display = <GoalSummary />;
  if (edit === true) display = <EditGoal setEdit={setEdit} setTab={setTab} />;
  // else if(tab=="sub-goal") display= <SubGoals />
  // else display= <Reflections />

  return (
    <div className="edit-goal-form-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} class="fa-solid fa-x x-close"></i>
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
          className={edit ? "goal-tab-heading-active" : "edit-goal-button"}
          onClick={() => {
            setEdit(true);
            setTab("edit");
          }}
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
      </div>
      <div className="edit-task-form-body-container"> {display}</div>
    </div>
  );
}
