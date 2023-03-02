import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import "./EditGoal.css";

export default function GoalSummary() {
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const { closeModal } = useModal();

  console.log("checking due date", singleGoal.due_date);
  console.log("checking due date", singleGoal);

  return (
    <div className="summary-page-container">
      <div className="summary-body-container">
        {/* {singleGoal.parent_id && <div>{singleGoal.parent?.name}</div>} */}
        <div className="summary-goal-item-title">Description:</div>
        <div>
          {singleGoal.description
            ? singleGoal.description
            : "No description provided."}
        </div>
        <div className="summary-goal-item-title">Time frame: </div>
        <div>
          {" "}
          {singleGoal.time_frame
            ? singleGoal.time_frame[0].toUpperCase() +
              singleGoal.time_frame.slice(1)
            : "n/a"}
        </div>
        <div className="summary-goal-item-title">Due Date:</div>
        <div className="">{singleGoal.due_date}</div>
        <div className="summary-goal-item-title"> Status:</div>
        <div>{singleGoal.status ? singleGoal.status : "Not started"}</div>
        <div>Sub-Goals</div>
        <div>List sub-goals here</div>
        <div>Sub-Tasks:</div>
        <div>List-sub-tasks here</div>

        {/* <div>Completed Sub-Goals:</div>
      <div>Conditionally show completed subtasks here</div> */}

        {/* <div className="summary-page-button-container">
        <div className="summary-page-buttons" onClick={() => closeModal()}>
          Cancel
        </div>
        <div className="summary-page-buttons" onClick={() => setEdit(true)}>
          Edit
        </div>
      </div> */}
      </div>
    </div>
  );
}
