import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoalsThunk } from "../../store/goals";
import ListField from "../ListField";
import "./Goals.css";

export default function Goals() {
  const year_goals = useSelector((state) => state.goals.year);
  const monthly_goals = useSelector((state) => state.goals.month);
  const weekly_goals = useSelector((state) => state.goals.week);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoalsThunk());
  }, []);

  return (
    <div className="goals-outer-container">
      <h1>All Goals</h1>
      <div className="goals-inner-container">
        <div className="goals-container">
          <ListField incommingList={year_goals} />
        </div>
        <div className="goals-container">
          <ListField incommingList={monthly_goals} />
        </div>
        <div className="goals-container">
          <ListField incommingList={weekly_goals} />
        </div>
      </div>
    </div>
  );
}
