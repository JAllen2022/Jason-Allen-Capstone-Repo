import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useModal } from "../../../context/Modal";
import { getHabitThunk, editHabitThunk } from "../../../store/habits";
import DeleteConfirmation from "../DeleteConfirmation";
import OpenModalButton from "../OpenModalButton";
import MonthGrid from "./MonthGrid";
import { useDate } from "../../../context/Date";

import "./HabitModal.css";

export default function HabitModal({ habitId, habit }) {
  const singleHabit = useSelector((state) => state.habits.habit);
  const [showMenu, setShowMenu] = useState(false);
  const [repeatOption, setRepeatOption] = useState("");
  const [showAddWeek, setShowAddWeek] = useState(false);
  const ulRef = useRef(null);
  const textAreaRef = useRef(null);

  const dispatch = useDispatch();

  const [tab, setTab] = useState("summary");
  const { weekString } = useDate();

  const [name, setName] = useState(habit.name);
  const [goal, setGoal] = useState(habit.goal_to_complete || 0);
  const [monday, setMonday] = useState(habit.monday);
  const [tuesday, setTuesday] = useState(habit.tuesday);
  const [wednesday, setWednesday] = useState(habit.wednesday);
  const [thursday, setThursday] = useState(habit.thursday);
  const [friday, setFriday] = useState(habit.friday);
  const [saturday, setSaturday] = useState(habit.saturday);
  const [sunday, setSunday] = useState(habit.sunday);
  const isMountedRef = useRef(false);
  const goalSum =
    monday + tuesday + wednesday + thursday + friday + saturday + sunday;

  const handleNameSubmit = (object) => {
    dispatch(editHabitThunk(object, weekString));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const newHabit = {
      ...habit,
      goal_to_complete: goal,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      actually_completed: goalSum,
    };

    console.log("checking new habit", newHabit);
    // const emptyStringCheck = name.split(" ").join("");
    // if (name.length && emptyStringCheck) {
    dispatch(editHabitThunk(newHabit, weekString));
    // }
  };

  const { closeModal, setModalContent } = useModal();
  const cancelClick = () => {
    closeModal();
  };

  useEffect(() => {
    console.log("what is show add week", showAddWeek);
    if (!showAddWeek && !ulRef.current) return;

    const closeMenu = (e) => {
      console.log("we in here 2");

      if (!ulRef.current.contains(e.target)) {
        console.log("we in here 3");

        setShowAddWeek(false);
      }
    };
    console.log("we in here 1");
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showAddWeek]);

  useEffect(() => {
    dispatch(getHabitThunk(habitId, weekString));
  }, [dispatch]);

  const closeMenu = () => {
    setShowMenu(false);
  };

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
        style={{ fontSize: "15px" }}
        max="7"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      ></input>
      <input type="submit" style={{ position: "absolute", display: "none" }} />
    </form>
  );

  useEffect(() => {
    // Only run effect on mount
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    if (habit) handleSubmit();
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday, goal]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [name]);

  return (
    <div className="habit-modal-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
      </div>
      <div className="habit-modal-title-container">
        <div className="habit-modal-title-icon-left">
          <i class="fa-regular fa-star"></i>
        </div>
        <div className="habit-modal-title-container-right">
          <form
            className="modal-title-form-container"
            onSubmit={handleSubmit}
            type="submit"
          >
            <textarea
              ref={textAreaRef}
              className="modal-title-input"
              placeholder={"Add a task..."}
              type="text"
              minLength="1"
              value={name || habit?.name}
              rows={1}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => {
                e.preventDefault();
                if (e.target.value.length < 1) {
                  return;
                }
                setName(e.target.value);
                handleNameSubmit({ ...habit, name: e.target.value });
              }}
            ></textarea>
            <input
              type="submit"
              style={{ position: "absolute", display: "none" }}
            />
          </form>
          <div className="habit-under-title-div">
            in Habits for the week of {weekString.slice(14)}
          </div>
        </div>
      </div>

      <div className="edit-goal-form-nav-container">
        <div className="edit-goal-left-nav">
          <div
            className={
              tab === "summary" ? "goal-tab-heading-active" : "goal-tab-heading"
            }
            onClick={() => {
              setTab("summary");
            }}
          >
            {" "}
            Summary{" "}
          </div>

          <div
            className={
              tab === "notes" ? "goal-tab-heading-active" : "goal-tab-heading"
            }
            onClick={() => {
              setTab("notes");
            }}
          >
            {" "}
            Notes{" "}
          </div>
        </div>

        <div className={"edit-goal-button-square"}>
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
              modalComponent={
                <DeleteConfirmation item={habit} habitBool={true} />
              }
            />
          </span>
        </div>
      </div>
      <div className="habit-modal-body-container">
        <div className="habit-modal-body-left">
          <div className="habit-week-container">
            <div className="habit-week-icon-container">
              <i class="fa-solid fa-calendar-week"></i>
            </div>
            <div className="habit-week-container-right">
              <h3 className="habit-modal-sub-headings">
                Progress for the week:
              </h3>

              <div className="habit-modal-single-week">
                <div className="habit-modal-single-week-container-title">
                  <div className="planner-habit-tracker-headings">M</div>
                  <div className="planner-habit-tracker-headings">T</div>
                  <div className="planner-habit-tracker-headings">W</div>
                  <div className="planner-habit-tracker-headings">T</div>
                  <div className="planner-habit-tracker-headings">F</div>
                  <div className="planner-habit-tracker-headings">S</div>
                  <div className="planner-habit-tracker-headings">S</div>
                  <div className="planner-habit-tracker-headings">
                    <i class="fa-regular fa-square-check"></i>
                  </div>
                  <div className="planner-habit-tracker-headings">Goal</div>
                </div>
                <div className="habit-modal-single-week-inputs-container">
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`1-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={monday}
                      onChange={() => setMonday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`1-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`2-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={tuesday}
                      onChange={() => setTuesday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`2-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`3-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={wednesday}
                      onChange={() => setWednesday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`3-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`4-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={thursday}
                      onChange={(e) => setThursday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`4-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`5-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={friday}
                      onChange={() => setFriday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`5-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg style={{ height: "100%" }} viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`6-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={saturday}
                      onChange={() => setSaturday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`6-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="planner-single-habit-tracker-check">
                    <input
                      type="checkbox"
                      id={`7-single-${habit.name}${habit.id}`}
                      className="single-check"
                      checked={sunday}
                      onChange={() => setSunday((prev) => !prev)}
                    />
                    <label
                      htmlFor={`7-single-${habit.name}${habit.id}`}
                      className="single-check-label"
                    >
                      <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                      </svg>
                    </label>
                  </div>
                  <div
                    id="habit-modal-goal-sum"
                    className="planner-single-habit-tracker-count"
                  >
                    {goalSum ? goalSum : "0"}
                  </div>
                  <div className="planner-single-habit-tracker-count">
                    {goalInput}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="habit-modal-year-calendar">
            <div className="habit-modoal-year-icon-left">
              <i class="fa-regular fa-calendar"></i>
            </div>
            <div className="habit-modal-year-calendar-right">
              <h3 className="habit-modal-sub-headings">
                Progress for the year:
              </h3>
              <MonthGrid />
            </div>
          </div>
        </div>
        <div className="habit-modal-body-right">
          <div className="habit-stats-container">
            <div className="habit-stat-button">
              <div>Total Habit Goal:</div>
              <div className="habit-stat-details">
                <i class="fa-solid fa-bullseye habit-icon"></i>
                <span> {singleHabit.total_habit_goal}</span>
              </div>
            </div>
            <div className="habit-stat-button">
              <div>Total habit acheived:</div>
              <div className="habit-stat-details">
                <i class="fa-solid fa-bars-progress habit-icon"></i>
                <span> {singleHabit.total_habit_completed}</span>
              </div>
            </div>
            <div className="habit-stat-button">
              <div>Total weeks tracked:</div>
              <div className="habit-stat-details ">
                <i class="fa-solid fa-flag habit-icon"></i>
                <span>{singleHabit.weeks_tracked}</span>
              </div>
            </div>
            <div className="habit-stat-button">
              {" "}
              <div>Additional weeks tracked:</div>
              <div className="habit-stat-details">
                <i class="fa-solid fa-calendar-days habit-icon"></i>
                <span>0</span>
              </div>
            </div>
          </div>

          <div className="habit-modal-action-options">
            Actions:
            <div
              className="habit-modal-action-button"
              onClick={() => setShowAddWeek((prev) => !prev)}
            >
              {" "}
              <i class="fa-solid fa-calendar-plus habit-button-icon"></i>
              Add weeks
            </div>
            {showAddWeek && (
              <div className="habit-modal-action-menu" ref={ulRef}>
                <div className="habit-modal-action-title-container">
                  Add weeks:{" "}
                  <span
                    className="habit-modal-action-x-spot"
                    // onClick={() => setShowAddWeek((prev) => !prev)}
                  >
                    X
                  </span>
                </div>
                <label htmlFor="priority" className="habit-modal-action-label">
                  Add weeks to track this habit:
                </label>
                <select
                  className="habit-modal-action-select"
                  name="priority"
                  value={repeatOption}
                  onChange={(e) => setRepeatOption(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="1">1 week</option>
                  <option value="2">2 weeks</option>
                  <option value="3">3 weeks</option>
                  <option value="4">1 month</option>
                  <option value="8">2 months</option>
                  <option value="12">3 months</option>
                  <option value="16">4 months</option>
                  <option value="20">5 months</option>
                  <option value="24">6 months</option>
                  <option value="28">7 months</option>
                  <option value="32">8 months</option>
                  <option value="36">9 months</option>
                  <option value="40">10 months</option>
                  <option value="44">11 months</option>
                  <option value="48">1 year</option>
                </select>
                <button
                  type="submit"
                  className="habit-modal-submit-action-button"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
