import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useDate } from "../../context/Date";
import { getCurrentWeek } from "../../context/Date";
import { getGoalsThunk, addDisplayTime } from "../../store/goals";
import {
  getTasksThunk,
  getWeekTasksThunk,
  setDisplayTime,
} from "../../store/tasks";
import Notebook from "../ReusableComponents/Notebook";
import ListField from "../ReusableComponents/ListField";
import Arrow from "../../Assets/Arrow";
import moment from "moment";

import "./Planner.css";
import WeekDayList from "./WeekDayList";

export default function Planner() {
  const allTasks = useSelector((state) => state.tasks.currentTasks);
  const user = useSelector((state) => state.session.user);
  const weekly_goals = useSelector((state) => state.goals.week);

  const dispatch = useDispatch();
  const {
    weekdays,
    dateOptions,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    date,
    setDate,
    dateString,
    setDateString,
    fetchDates,
    displayDates,
  } = useDate();
  const monthstring = date.toLocaleString("default", { month: "long" });
  const week = getCurrentWeek(date);

  useEffect(() => {
    setDate(new Date(year, month, day));
  }, [month, day, year]);

  useEffect(() => {
    const dispYear = date.getFullYear();
    const monthDisp = `${monthstring}, ${date.getFullYear()}`;
    dispatch(
      getGoalsThunk({
        year: dispYear,
        month: monthDisp,
        week,
      })
    );
    dispatch(
      getWeekTasksThunk({
        mon: fetchDates[0],
        tue: fetchDates[1],
        wed: fetchDates[2],
        thu: fetchDates[3],
        fri: fetchDates[4],
        sat: fetchDates[5],
        sun: fetchDates[6],
      })
    );
    dispatch(addDisplayTime(dispYear, monthDisp, week));
    setDateString(date.toLocaleDateString("en-US", dateOptions));
    const dueDate = {
      due_date: date.toLocaleDateString("en-US", dateOptions),
    };
    dispatch(getTasksThunk(dueDate));
    dispatch(setDisplayTime(dueDate));
  }, [date]);

  const decreaseWeek = () => setDay(day - 7);
  const increaseWeek = () => setDay(day + 7);

  const leftPageDisplayGoalHeader = (
    <h4 className="planner-goal-list-header">
      <span className="header-timefame-text">Goals for the week</span>
    </h4>
  );

  const habitContainer = [];
  const displayHabitCount = 5;
  for (let i = 0; i < displayHabitCount; i++) {
    habitContainer.push(
      <>
        {" "}
        <div className="planner-habit-tracker-name"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-check"></div>
        <div className="planner-habit-tracker-count"></div>
        <div className="planner-habit-tracker-count"></div>
      </>
    );
  }
  console.log("what is week", week);
  const leftPage = (
    <div className="planner-left-page">
      <div className="goals-container-right">
        <ListField
          incomingList={Object.values(weekly_goals)}
          timeFrame={"week"}
          year={year}
          setYear={setYear}
          month={month}
          day={day}
          setDay={setDay}
          date={date}
          setDate={setDate}
          week={week}
          monthString={monthstring}
          truncate={true}
          defaultFilter={user.goal_week_filter}
          displayHeader={leftPageDisplayGoalHeader}
        />
      </div>
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
    </div>
  );

  // Set the date for the desired week (in this case, the week of March 20, 2023)

  const rightPage = (
    <div className="planner-page-right-container">
      {displayDates.map((weekday, index) => (
        <WeekDayList
          key={`${weekday}`}
          dayString={weekday}
          fetchDate={fetchDates[index]}
        />
      ))}
      {/* <h4 className="list-header">
        <span
          className="list-header-date-buttons"
          onClick={() => setDay((prev) => prev - 1)}
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </span>
        <span className="header-timefame-text">
          {weekdays[date.getDay()]}, {`${month + 1}/${day}/${year}`}
        </span>
        <span
          className="list-header-date-buttons"
          onClick={() => setDay((prev) => prev + 1)}
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </span>
      </h4>
      <div className="task-left-page-list-field">
        <ListField
          taskBool={true}
          dueDate={dateString}
          incomingList={Object.values(allTasks)}
          defaultFilter={user.task_filter}
        />
      </div> */}
    </div>
  );

  return (
    <div className="planner-container">
      <div className="planner-week-text">Week of {week}</div>
      <Notebook leftPageContent={leftPage} rightPageContent={rightPage} />{" "}
      <div className="planner-arrow-container">
        {" "}
        <div className="planner-arrow-left-right">
          <Arrow classString={"left-arrow"} onClick={decreaseWeek} />
          <Arrow classString={"right-arrow"} onClick={increaseWeek} />
        </div>
        <div className="planner-arrow-descriptions">
          <div className="planner-arrow-text" onClick={decreaseWeek}>
            Previous Week
          </div>
          <div className="planner-arrow-text" onClick={increaseWeek}>
            Next Week
          </div>
        </div>
      </div>
    </div>
  );
}
