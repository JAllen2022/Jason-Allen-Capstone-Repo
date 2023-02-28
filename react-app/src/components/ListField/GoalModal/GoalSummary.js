import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoalThunk, editGoalThunk } from "../../../store/goals";
import { useModal } from "../../../context/Modal";
import CreateSubGoal from "./CreateSubGoal";
import EditGoal from "./EditGoal";
import "./EditGoal.css";

export default function GoalSummary() {
  const singleGoal = useSelector((state) => state.goals.singleGoal);
  const [edit, setEdit] = useState(false);
  const { closeModal } = useModal();
  const summaryBody = (
    <div className="summary-body-container">
      <div>Description:</div>
      <div>{singleGoal.description ? singleGoal.description : "n/a"}</div>
      <div>Time frame: </div>
      <div>
        {" "}
        {singleGoal.time_frame
          ? singleGoal.time_frame[0].toUpperCase() +
            singleGoal.time_frame.slice(1)
          : "n/a"}
      </div>
      <div>Accomplish By Date:</div>
      <div>{singleGoal.description ? singleGoal.description : "n/a"}</div>
      <div> Status: {singleGoal.status ? singleGoal.status : "n/a"}</div>
      <div>
        Description: {singleGoal.description ? singleGoal.description : "n/a"}
      </div>
      <div>
        Description: {singleGoal.description ? singleGoal.description : "n/a"}
      </div>
      <div>
        Description: {singleGoal.description ? singleGoal.description : "n/a"}
      </div>
      <div>
        Description: {singleGoal.description ? singleGoal.description : "n/a"}
      </div>
      <div className="summary-page-button-container">
        <div className="summary-page-buttons" onClick={() => closeModal()}>
          Cancel
        </div>
        <div className="summary-page-buttons" onClick={() => setEdit(true)}>
          Edit
        </div>
      </div>
    </div>
  );

  return (
    <div className="summary-page-container">
      {edit ? <EditGoal setEdit={setEdit} /> : summaryBody}
    </div>
  );
}
