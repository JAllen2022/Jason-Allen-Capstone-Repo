import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDisplayTime, getGoalsThunk } from "../../store/goals";
import ListField from "../ReusableComponents/ListField";
import Notebook from "../ReusableComponents/Notebook";
import { useDate } from "../../context/Date";
import { getCurrentWeek } from "../../context/Date";
import "./Goals.css";

export default function Goals() {
  const user = useSelector((state) => state.session.user);
  const year_goals = useSelector((state) => state.goals.year);
  const monthly_goals = useSelector((state) => state.goals.month);
  const weekly_goals = useSelector((state) => state.goals.week);
  const dispatch = useDispatch();
  const { year, setYear, month, setMonth, day, setDay, date, setDate } =
    useDate();

  const monthstring = date.toLocaleString("default", { month: "long" });
  const week = getCurrentWeek(date);

  // Code to allow for scrolling through each column
  const decreaseWeek = () => setDay(day - 7);
  const increaseWeek = () => setDay(day + 7);

  const decreaseMonth = () => setMonth(month - 1);
  const increaseMonth = () => setMonth(month + 1);

  const decreaseYear = () => setYear(year - 1);
  const increaseYear = () => setYear(year + 1);

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
    dispatch(addDisplayTime(dispYear, monthDisp, week));
  }, [date]);

  const displayHeaderYear = (
    <h4 className="list-header">
      <span className="list-header-date-buttons" onClick={decreaseYear}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </span>
      <span className="header-timefame-text">{`${date.getFullYear()} Goals`}</span>
      <span className="list-header-date-buttons" onClick={increaseYear}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </span>
    </h4>
  );

  const displayHeaderMonth = (
    <h4 className="list-header">
      <span className="list-header-date-buttons" onClick={decreaseMonth}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </span>
      <span className="header-timefame-text">{`${monthstring} Goals`}</span>
      <span className="list-header-date-buttons" onClick={increaseMonth}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </span>
    </h4>
  );

  const displayHeaderWeek = (
    <h4 className="list-header">
      <span className="list-header-date-buttons" onClick={decreaseWeek}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </span>
      <span className="header-timefame-text">{week}</span>
      <span className="list-header-date-buttons" onClick={increaseWeek}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </span>
    </h4>
  );

  const leftPage = (
    <ListField
      incomingList={Object.values(year_goals)}
      timeFrame={"year"}
      year={year}
      setYear={setYear}
      month={month}
      day={day}
      setDay={setDay}
      date={date}
      setDate={setDate}
      monthString={monthstring}
      defaultFilter={user.goal_year_filter}
      displayHeader={displayHeaderYear}
    />
  );

  const rightPage = (
    <>
      <div className="goals-container-right">
        <ListField
          incomingList={Object.values(monthly_goals)}
          timeFrame={"month"}
          year={year}
          setYear={setYear}
          month={month}
          day={day}
          setDay={setDay}
          date={date}
          setDate={setDate}
          monthString={monthstring}
          truncate={true}
          defaultFilter={user.goal_month_filter}
          displayHeader={displayHeaderMonth}
        />
      </div>
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
          displayHeader={displayHeaderWeek}
        />
      </div>
    </>
  );
  return <Notebook leftPageContent={leftPage} rightPageContent={rightPage} />;
}
