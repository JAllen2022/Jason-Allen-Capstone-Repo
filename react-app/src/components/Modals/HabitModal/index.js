import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useModal } from "../../../context/Modal";
import {
  getHabitThunk,
  editHabitThunk,
  createHabitInstancesThunk,
} from "../../../store/habits";
import DeleteConfirmation from "../DeleteConfirmation";
import OpenModalButton from "../OpenModalButton";
import MonthGrid from "./MonthGrid";
import { useDate, getWeekStrings } from "../../../context/Date";

import "./HabitModal.css";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Helper Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function renderOptions(numberOfFutureHabits) {
  const maxWeeks = 52 - numberOfFutureHabits;
  const options = [];

  for (let i = 1; i <= Math.min(maxWeeks, 4); i++) {
    options.push(
      <option key={i} value={i}>
        {i} week{i > 1 ? "s" : ""}
      </option>
    );
  }

  // Show months from 1 to 10
  for (let i = 1; i <= maxWeeks / 4; i++) {
    const weeksInMonth = i * 4;
    if (weeksInMonth < maxWeeks) {
      options.push(
        <option key={i + 4} value={weeksInMonth}>
          {i} month{i > 1 ? "s" : ""}
        </option>
      );
    }
  }

  return options;
}

function findLargestId(instances) {
  return Math.max(...Object.keys(instances));
}

function getStartAddDate(habit) {
  const key = findLargestId(habit.habit_instances);
  return [habit.habit_instances[key].year, habit.habit_instances[key].week];
}

export default function HabitModal({ habitId, habit }) {
  // ~~~~~~~~~~~~~~~~~~~~ Declaration of Variables ~~~~~~~~~~~~~~~~~~~~~~~~~

  const singleHabit = useSelector((state) => state.habits.habit);
  const [showMenu, setShowMenu] = useState(false);
  const [repeatOption, setRepeatOption] = useState("");
  const [showAddWeek, setShowAddWeek] = useState(false);
  const [nameError, setNameError] = useState("");
  const ulRef = useRef(null);
  const textAreaRef = useRef(null);

  const dispatch = useDispatch();

  const [tab, setTab] = useState("summary");
  const { weekString, year } = useDate();

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

  let numberOfFutureHabits = 0;
  if (singleHabit?.habit_instances) {
    numberOfFutureHabits = singleHabit.habit_instances[habit.id]?.future_events;
  }

  const futureAddOptions = renderOptions(numberOfFutureHabits);

  // ~~~~~~~~~~~~~~~~~~~~ Handle Submit Functions ~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleNameSubmit = (object) => {
    const emptyStringCheck = object.name.split(" ").join("");
    if (object.name.length && emptyStringCheck) {
      dispatch(editHabitThunk(object, weekString));
    }
  };
  const handleInstanceAdd = (e) => {
    e.preventDefault();
    const startDate = getStartAddDate(singleHabit);
    const weeks = getWeekStrings(...startDate, repeatOption);

    console.log("checking weeks", weeks);

    const data = {};
    data["dates"] = weeks;

    dispatch(createHabitInstancesThunk(data, habit.id));

    setShowAddWeek(false);
  };

  const weeks = getWeekStrings(year, weekString, repeatOption);

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

    // const emptyStringCheck = name.split(" ").join("");
    // if (name.length && emptyStringCheck) {
    dispatch(editHabitThunk(newHabit, weekString));
    // }
  };

  const { closeModal, setModalContent } = useModal();
  const cancelClick = () => {
    closeModal();
  };

  // ~~~~~~~~~~~~~~~~~~~~ UseEffect Functions ~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    console.log("what is show add week", showAddWeek);
    if (!showAddWeek && !ulRef.current) return;

    let isMenuOpened = false;

    const openMenu = () => {
      isMenuOpened = true;
    };

    const closeMenu = (e) => {
      if (isMenuOpened && !ulRef.current.contains(e.target)) {
        setShowAddWeek(false);
        isMenuOpened = false;
      }
    };

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

  // ~~~~~~~~~~~~~~~~~~~~ Rendered Display ~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <div className="habit-modal-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
      </div>
      <div className="habit-modal-title-container">
        <div className="habit-modal-title-icon-left">
          <i id="habit-star-icon" className="fa-regular fa-star"></i>
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
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim().length === 0) {
                  setNameError("Name must not be empty or only spaces.");
                } else {
                  setNameError("");
                }
              }}
              onBlur={(e) => {
                e.preventDefault();
                if (nameError) {
                  e.preventDefault();
                } else {
                  setName(e.target.value);
                  handleNameSubmit({ ...habit, name: e.target.value });
                }
              }}
            ></textarea>
            {nameError && <div style={{ color: "maroon" }}>**{nameError}</div>}
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

      <div className="habit-modal-body-container">
        <div className="habit-modal-body-left">
          <div className="habit-week-container">
            <div className="habit-week-icon-container">
              <i className="fa-solid fa-calendar-week"></i>
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
                    <i className="fa-regular fa-square-check"></i>
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
            <div className="habit-modal-year-icon">
              <i className="fa-regular fa-calendar"></i>
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
          <div className="habit-modal-display-button-container">
            <div className="habit-modal-right-title">Display:</div>

            <div
              className={`habit-modal-action-button
              ${tab === "summary" ? "habit-display-tab" : ""}
            `}
              onClick={() => {
                setTab("summary");
              }}
            >
              {" "}
              <i class="fa-regular fa-newspaper habit-button-icon"></i> Summary{" "}
            </div>

            <div
              className={`habit-modal-action-button ${
                tab === "notes" ? "habit-display-tab" : ""
              }
            `}
              onClick={() => {
                setTab("notes");
              }}
            >
              {" "}
              <i class="fa-regular fa-note-sticky habit-button-icon"></i> Notes{" "}
            </div>

            {/* <div className={"edit-goal-button-square"}>
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
                    <DeleteConfirmation
                      item={singleHabit}
                      instanceId={habit.id}
                      habitBool={true}
                    />
                  }
                />
              </span>
            </div> */}
          </div>
          <div className="habit-modal-action-options">
            <div className="habit-modal-right-title">Actions:</div>
            <div
              className="habit-modal-action-button"
              onClick={() => setShowAddWeek((prev) => !prev)}
            >
              {" "}
              <i className="fa-solid fa-calendar-plus habit-button-icon"></i>
              Add weeks
            </div>
            {showAddWeek && (
              <div className="habit-modal-action-menu" ref={ulRef}>
                <div className="habit-modal-action-title-container">
                  Add weeks:{" "}
                  <span
                    className="habit-modal-action-x-spot"
                    onClick={() => setShowAddWeek((prev) => !prev)}
                  >
                    X
                  </span>
                </div>
                <form
                  className="habit-modal-action-form"
                  onSubmit={handleInstanceAdd}
                  type="submit"
                >
                  <label
                    htmlFor="priority"
                    className="habit-modal-action-label"
                  >
                    Track this habbit for an additional:
                  </label>
                  <select
                    className="habit-modal-action-select"
                    name="priority"
                    value={repeatOption}
                    onChange={(e) => setRepeatOption(e.target.value)}
                  >
                    <option value="">None</option>
                    {/* <option value="1">1 week</option>
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
                    <option value="52">1 year</option> */}
                    {futureAddOptions}
                  </select>
                  <button
                    type="submit"
                    className="habit-modal-submit-action-button"
                  >
                    Add
                  </button>
                </form>
              </div>
            )}
            <div
              className="habit-modal-action-button"
              onClick={() =>
                setModalContent(
                  <DeleteConfirmation
                    item={singleHabit}
                    instanceId={habit.id}
                    habitBool={true}
                  />
                )
              }
            >
              {" "}
              <i className="fa-solid fa-trash habit-button-icon"></i>
              Delete
            </div>
          </div>
          <div id="habit-modal-stats-title" className="habit-modal-right-title">
            Stats:
          </div>
          <div className="habit-stats-container">
            <div className="habit-stat-button">
              <div>Total Goal</div>
              <div className="habit-stat-details">
                <i className="fa-solid fa-bullseye habit-icon"></i>
                <span> {singleHabit.total_habit_goal}</span>
              </div>
            </div>
            <div className="habit-stat-button">
              <div>Habit count</div>
              <div className="habit-stat-details">
                <i className="fa-solid fa-bars-progress habit-icon"></i>
                <span> {singleHabit.total_habit_completed}</span>
              </div>
            </div>
            <div className="habit-stat-button">
              <div>Weeks tracked</div>
              <div className="habit-stat-details ">
                <i className="fa-solid fa-flag habit-icon"></i>
                <span>{singleHabit.weeks_tracked}</span>
              </div>
            </div>
            <div className="habit-stat-button">
              {" "}
              <div>Future Weeks</div>
              <div className="habit-stat-details">
                <i className="fa-solid fa-calendar-days habit-icon"></i>
                <span>{numberOfFutureHabits}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
