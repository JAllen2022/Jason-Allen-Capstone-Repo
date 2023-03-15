import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDisplayTime, getGoalsThunk } from "../../store/goals";
import ListField from "../ListField";
import Notebook from "../Notebook";
import "./Goals.css";

// Helper function to get the week for a date object passed in
export function getCurrentWeek(currentDate) {
  const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const daysFromSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
  const monday = new Date(currentDate.getTime() - daysToMonday * 86400000); // 86400000 = 1 day in milliseconds
  const sunday = new Date(currentDate.getTime() + daysFromSunday * 86400000);
  const mondayString = monday.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const sundayString = sunday.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return `Weekly Goals: ${mondayString} - ${sundayString}`;
}

export default function Goals() {
  const user = useSelector((state) => state.session.user);
  const year_goals = useSelector((state) => state.goals.year);
  const monthly_goals = useSelector((state) => state.goals.month);
  const weekly_goals = useSelector((state) => state.goals.week);
  const dispatch = useDispatch();

  // Use state here to determine date and pass down date object to children elements
  const currDate = new Date();
  const [month, setMonth] = useState(currDate.getMonth());
  const [year, setYear] = useState(currDate.getFullYear());
  const [day, setDay] = useState(currDate.getDate());
  const [date, setDate] = useState(currDate);
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

  // <div className="goals-outer-container">
  //   <h1>All Goals</h1>
  //   <div className="goals-inner-container">
  //     <div className="goals-container">
  //       <ListField
  //         incomingList={Object.values(year_goals)}
  //         timeFrame={"year"}
  //         year={year}
  //         dueDate={year}
  //         setYear={setYear}
  //         month={month}
  //         day={day}
  //         setDay={setDay}
  //         date={date}
  //         setDate={setDate}
  //         increase={increaseYear}
  //         decrease={decreaseYear}
  //         monthString={monthstring}
  //         defaultFilter={user.goal_year_filter}
  //       />
  //     </div>
  //   </div>
  // </div>;

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
      increase={increaseYear}
      decrease={decreaseYear}
      monthString={monthstring}
      defaultFilter={user.goal_year_filter}
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
          decrease={decreaseMonth}
          increase={increaseMonth}
          monthString={monthstring}
          truncate={true}
          defaultFilter={user.goal_month_filter}
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
          increase={increaseWeek}
          decrease={decreaseWeek}
          week={week}
          monthString={monthstring}
          truncate={true}
          defaultFilter={user.goal_week_filter}
        />
      </div>
    </>
  );
  return <Notebook leftPageContent={leftPage} rightPageContent={rightPage} />;
}
