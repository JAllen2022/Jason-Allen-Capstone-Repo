import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHabitThunk, getHabitsThunk } from "../../store/habits";
import { useDate } from "../../context/Date";
import WeeklyHabit from "./WeeklyHabit";


export default function WeeklyHabitTracker() {
  const [name, setName] = useState("");
  const { year, monthDisp, weekString } = useDate();

  const habits = useSelector((state) => state.habits.habits);
  const totalWeekAccomplished = useSelector(
    (state) => state.habits.totalWeekAccomplished
  );
  const totalWeekGoal = useSelector((state) => state.habits.totalWeekGoal);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHabit = {
      name,
      year,
      month: monthDisp,
      week: weekString,
    };
    console.log("checking new habit", newHabit);

    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      dispatch(createHabitThunk(newHabit));
      setName("");
    }
  };

  const createHabit = (
    <>
      <div className="planner-habit-tracker-input">
        <form
          className="weekday-list-form-container"
          onSubmit={handleSubmit}
          type="submit"
        >
          <input
            className="habit-goal-name-field"
            placeholder={"Add a habit..."}
            type="text"
            minLength="1"
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
  const habitsArray = Object.values(habits);
  if (habitsArray.length) {
    habitsArray.forEach((habit, index) =>
      habitContainer.push(
        <WeeklyHabit key={`${habit.name}${index}-weeklyhabit`} habit={habit} />
      )
    );
  }
  habitContainer.push(createHabit);
  if (habitsArray.length < displayHabitCount) {
    const lengthDifference = displayHabitCount - habitsArray.length;
    for (let i = 0; i < lengthDifference; i++) {
      habitContainer.push(<WeeklyHabit key={`empty-${i}`} />);
    }
  }
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
          <div className="planner-habit-tracker-headings">
            <i className="fa-regular fa-square-check"></i>
          </div>
          <div className="planner-habit-tracker-headings">Goal</div>
        </div>
        <div className="planner-habit-tracker-body-container">
          {habitContainer}
        </div>
        <div className="planner-habit-tracker-footer-container">
          <div className="planner-habit-footer-heading">Total</div>
          <div className="planner-habit-tracker-count">
            {totalWeekAccomplished}{" "}
          </div>
          <div className="planner-habit-tracker-count">{totalWeekGoal}</div>
        </div>
      </div>
    </div>
  );
}
