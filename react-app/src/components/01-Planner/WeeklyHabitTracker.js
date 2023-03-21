import { useState } from "react";
import WeeklyHabit from "./WeeklyHabit";

export default function WeeklyHabitTracker() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const createHabit = (
    <>
      <div className="planner-habit-tracker-name">
        <form
          className="weekday-list-form-container"
          onSubmit={handleSubmit}
          type="submit"
        >
          <input
            className="weekday-list-create-list-item-input-field"
            placeholder={"Add a habit..."}
            type="text"
            maxLength="50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="submit"
            style={{ position: "absolute", display: "none" }}
          />
        </form>
      </div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
      <div className="planner-habit-tracker-count"></div>
    </>
  );

  const habitContainer = [];
  const displayHabitCount = 4;
  for (let i = 0; i < displayHabitCount; i++) {
    habitContainer.push(<WeeklyHabit />);
  }
  habitContainer.push(createHabit);

  return (
    <div className="planner-weekly-habit-tracker-container">
      <h4 className="planner-goal-list-header">
        <span className="header-timefame-text">Habit Tracker</span>
      </h4>
      <div className="planner-habit-container">
        <div className="planner-habit-tracker-heading-container">
          <div className="planner-habit-tracker-headings">Habit</div>
          <div className="planner-habit-tracker-headings">M</div>
          <div className="planner-habit-tracker-headings">T</div>
          <div className="planner-habit-tracker-headings">W</div>
          <div className="planner-habit-tracker-headings">T</div>
          <div className="planner-habit-tracker-headings">F</div>
          <div className="planner-habit-tracker-headings">S</div>
          <div className="planner-habit-tracker-headings">S</div>
          <div className="planner-habit-tracker-headings">Achievied </div>
          <div className="planner-habit-tracker-headings">Goal</div>
        </div>
        <div className="planner-habit-tracker-body-container">
          {habitContainer}
        </div>
        <div className="planner-habit-tracker-footer-container">
          <div className="planner-habit-tracker-headings">Total</div>
          <div className="planner-habit-tracker-count">Count </div>
          <div className="planner-habit-tracker-count">Count</div>
        </div>
      </div>
    </div>
  );
}
