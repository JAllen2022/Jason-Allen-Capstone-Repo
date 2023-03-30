import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editHabitThunk, getHabitThunk } from "../../store/habits";
import { useModal } from "../../context/Modal";
import HabitModal from "../Modals/HabitModal";
import { useDate } from "../../context/Date";

export default function WeeklyHabit({ habit }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const { weekString } = useDate();

  // const [name, setName] = useState(habit?.name);
  const [goal, setGoal] = useState(habit?.goal_to_complete || 0);
  const [monday, setMonday] = useState(habit?.monday);
  const [tuesday, setTuesday] = useState(habit?.tuesday);
  const [wednesday, setWednesday] = useState(habit?.wednesday);
  const [thursday, setThursday] = useState(habit?.thursday);
  const [friday, setFriday] = useState(habit?.friday);
  const [saturday, setSaturday] = useState(habit?.saturday);
  const [sunday, setSunday] = useState(habit?.sunday);
  const isMountedRef = useRef(false);
  const goalSum =
    monday + tuesday + wednesday + thursday + friday + saturday + sunday;

  const handleSubmit = (newHabit) => {
    console.log("checking new habit", newHabit);
    // const emptyStringCheck = name.split(" ").join("");
    // if (name.length && emptyStringCheck) {
    console.log("we in the planner");
    dispatch(editHabitThunk(newHabit, weekString));
    // }
  };
  // const weeklyInput = (

  // );

  // useEffect(() => {
  //   // Only run effect on mount
  //   if (!isMountedRef.current) {
  //     isMountedRef.current = true;
  //     return;
  //   }
  //   if (habit) handleSubmit();
  // }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday, goal]);

  useEffect(() => {
    setGoal(habit?.goal_to_complete);
    setMonday(habit?.monday);
    setTuesday(habit?.tuesday);
    setWednesday(habit?.wednesday);
    setThursday(habit?.thursday);
    setFriday(habit?.friday);
    setSaturday(habit?.saturday);
    setSunday(habit?.sunday);
  }, [habit]);

  console.log("checking re-render amount");

  const goalInput = (
    <form
      className="weekday-list-form-container"
      onSubmit={handleSubmit}
      type="submit"
    >
      <input
        className="habit-goal-field"
        placeholder={"Add a number"}
        type="number"
        min="1"
        max="7"
        value={goal}
        onChange={(e) => {
          e.preventDefault();
          setGoal(e.target.value);
          handleSubmit({ ...habit, goal: e.target.value });
        }}
      ></input>
      <input type="submit" style={{ position: "absolute", display: "none" }} />
    </form>
  );

  const onClickName = () => {
    // dispatch(getHabitThunk(habit.habit_id));
    setModalContent(<HabitModal habitId={habit.habit_id} habit={habit} />);
  };

  let displayBody;

  if (habit) {
    displayBody = (
      <>
        {" "}
        <div className="planner-habit-tracker-name" onClick={onClickName}>
          <span className="planner-habit-tracker-name-span">{habit?.name}</span>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`1-${habit.name}${habit.id}`}
            className="check"
            checked={monday}
            onChange={(e) => {
              setMonday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, monday: !monday });
            }}
          />
          <label htmlFor={`1-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`2-${habit.name}${habit.id}`}
            className="check"
            checked={tuesday}
            onChange={(e) => {
              setTuesday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, tuesday: !tuesday });
            }}
          />
          <label htmlFor={`2-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`3-${habit.name}${habit.id}`}
            className="check"
            checked={wednesday}
            onChange={(e) => {
              setWednesday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, wednesday: !wednesday });
            }}
          />
          <label htmlFor={`3-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`4-${habit.name}${habit.id}`}
            className="check"
            checked={thursday}
            onChange={(e) => {
              setThursday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, thursday: !thursday });
            }}
          />
          <label htmlFor={`4-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`5-${habit.name}${habit.id}`}
            className="check"
            checked={friday}
            onChange={(e) => {
              setFriday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, friday: !friday });
            }}
          />
          <label htmlFor={`5-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`6-${habit.name}${habit.id}`}
            className="check"
            checked={saturday}
            onChange={(e) => {
              setSaturday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, saturday: !saturday });
            }}
          />
          <label htmlFor={`6-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-check">
          <input
            type="checkbox"
            id={`7-${habit.name}${habit.id}`}
            className="check"
            checked={sunday}
            onChange={(e) => {
              setSunday((prev) => !prev);
              e.preventDefault();
              handleSubmit({ ...habit, sunday: !sunday });
            }}
          />
          <label htmlFor={`7-${habit.name}${habit.id}`} className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <div className="planner-habit-tracker-count">
          {goalSum ? goalSum : "0"}
        </div>
        <div className="planner-habit-tracker-count">{goalInput}</div>
      </>
    );
  } else {
    displayBody = (
      <>
        <div className="planner-habit-tracker-count"></div>
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
  }
  return displayBody;
}
