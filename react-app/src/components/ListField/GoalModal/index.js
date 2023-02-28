import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import GoalSummary from "./GoalSummary";
import "./EditGoal.css";

export default function GoalModal({ itemId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [tab, setTab] = useState("summary");

  const cancelClick = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getGoalThunk(itemId));
  }, [dispatch]);

  let display = "";

  if (tab === "summary") display = <GoalSummary />;
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
        <div
          className={
            tab === "summary" ? "list-tab-heading-active" : "list-tab-heading"
          }
          onClick={() => setTab("summary")}
        >
          {" "}
          Summary{" "}
        </div>
        <div
          className={
            tab === "sub-goal" ? "list-tab-heading-active" : "list-tab-heading"
          }
          onClick={() => setTab("sub-goal")}
        >
          {" "}
          Sub-Goals{" "}
        </div>
        <div
          className={
            tab === "reflections"
              ? "list-tab-heading-active"
              : "list-tab-heading"
          }
          onClick={() => setTab("reflections")}
        >
          {" "}
          Reflections{" "}
        </div>
      </div>
      <div className="edit-task-form-body-container"> {display}</div>
    </div>
  );
}
