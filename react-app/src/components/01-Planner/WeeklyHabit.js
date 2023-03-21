import { useState } from "react";

export default function WeeklyHabit() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0);
  const [monday, setMonday] = useState(true);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const handleSubmit = () => {};
  const weeklyInput = (
    <form
      className="weekday-list-form-container"
      onSubmit={handleSubmit}
      type="submit"
    >
      <input
        className="weekday-list-create-list-item-input-field"
        placeholder={"Add a task..."}
        type="text"
        maxLength="50"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input type="submit" style={{ position: "absolute", display: "none" }} />
    </form>
  );

  const goalInput = (
    <form
      className="weekday-list-form-container"
      onSubmit={handleSubmit}
      type="submit"
    >
      <input
        className="weekday-list-create-list-item-input-field"
        placeholder={"Add a number"}
        type="number"
        min="1"
        max="7"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      ></input>
      <input type="submit" style={{ position: "absolute", display: "none" }} />
    </form>
  );

  const goalSum =
    monday + tuesday + wednesday + thursday + friday + saturday + sunday;

  return (
    <>
      {" "}
      <div className="planner-habit-tracker-name">{weeklyInput}</div>
      <div className="planner-habit-tracker-check">
        <div className="form">
          <input
            type="checkbox"
            id="check1"
            className="check"
            checked={monday}
            onChange={() => setMonday((prev) => !prev)}
          />
          <label for="check1" className="check-label">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
      </div>
      <div className="planner-habit-tracker-check">
        <input
          type="checkbox"
          id="check2"
          className="check"
          checked={tuesday}
          onChange={() => setTuesday((prev) => !prev)}
        />
        <label for="check2" className="check-label">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <div className="planner-habit-tracker-check">
        <input
          type="checkbox"
          id="check3"
          className="check"
          checked={wednesday}
          onChange={() => setWednesday((prev) => !prev)}
        />
        <label for="check3" className="check-label">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <div className="planner-habit-tracker-check">
        <input
          type="checkbox"
          id="check4"
          className="check"
          checked={thursday}
          onChange={() => setThursday((prev) => !prev)}
        />
        <label for="check4" className="check-label">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <div className="planner-habit-tracker-check">
        <input
          type="checkbox"
          id="check5"
          className="check"
          checked={friday}
          onChange={() => setFriday((prev) => !prev)}
        />
        <label for="check5" className="check-label">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <div className="planner-habit-tracker-check">
        <input
          type="checkbox"
          id="check6"
          className="check"
          checked={saturday}
          onChange={() => setSaturday((prev) => !prev)}
        />
        <label for="check6" className="check-label">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <div className="planner-habit-tracker-check">
        <input
          type="checkbox"
          id="check7"
          className="check"
          checked={sunday}
          onChange={() => setSunday((prev) => !prev)}
        />
        <label for="check7" className="check-label">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <div className="planner-habit-tracker-count">{goalSum}</div>
      <div className="planner-habit-tracker-count">{goalInput}</div>
    </>
  );
}
