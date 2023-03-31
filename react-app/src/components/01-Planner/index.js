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
import Arrow from "../../assets/Arrow";
import { getHabitsThunk } from "../../store/habits";
import WeeklyHabitTracker from "./WeeklyHabitTracker";
import WeekDayList from "./WeekDayList";

import "./Planner.css";

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
    weekString,
  } = useDate();
  const monthstring = date.toLocaleString("default", { month: "long" });

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
        week: weekString,
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
    dispatch(addDisplayTime(dispYear, monthDisp, weekString));
    setDateString(date.toLocaleDateString("en-US", dateOptions));
    const dueDate = {
      due_date: date.toLocaleDateString("en-US", dateOptions),
    };
    dispatch(getTasksThunk(dueDate));
    dispatch(setDisplayTime(dueDate));
    dispatch(getHabitsThunk({ week: weekString }));
  }, [date]);

  const decreaseWeek = () => setDay(day - 7);
  const increaseWeek = () => setDay(day + 7);

  const leftPageDisplayGoalHeader = (
    <h4 className="planner-goal-list-header">
      <span className="header-timefame-text">Goals for the week</span>
    </h4>
  );

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
          week={weekString}
          monthString={monthstring}
          truncate={true}
          defaultFilter={user.goal_week_filter}
          displayHeader={leftPageDisplayGoalHeader}
        />
      </div>
      <WeeklyHabitTracker />
    </div>
  );

  const rightPage = (
    <div className="planner-page-right-container">
      {displayDates.map((weekday, index) => (
        <WeekDayList
          key={`${weekday}`}
          dayString={weekday}
          fetchDate={fetchDates[index]}
        />
      ))}
    </div>
  );

  return (
    <div className="planner-container">
      <div className="planner-week-text">Week of {weekString.slice(14)}</div>
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
