import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoalsThunk } from "../../store/goals";
import ListField from "../ListField";
import "./Goals.css";

export default function Goals() {
  const year_goals = useSelector((state) => state.goals.year);
  const monthly_goals = useSelector((state) => state.goals.month);
  const weekly_goals = useSelector((state) => state.goals.week);
  const dispatch = useDispatch();

  console.log("checking for year_goals re-render", year_goals);
  // Use state here to determine date and pass down date object to children elements
  const currDate = new Date();
  const [month, setMonth] = useState(currDate.getMonth());
  const [year, setYear] = useState(currDate.getFullYear());
  const [day, setDay] = useState(currDate.getDate());
  const [date, setDate] = useState(currDate);

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
    dispatch(getGoalsThunk());
  }, []);

  return (
    <div className="goals-outer-container">
      <h1>All Goals</h1>
      <div className="goals-inner-container">
        <div className="goals-container">
          <ListField
            incommingList={Object.values(year_goals)}
            timeFrame={"year"}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            date={date}
            setDate={setDate}
            increase={increaseYear}
            decrease={decreaseYear}
          />
        </div>
        <div className="goals-container">
          <ListField
            incommingList={Object.values(monthly_goals)}
            timeFrame={"month"}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            date={date}
            setDate={setDate}
            decrease={decreaseMonth}
            increase={increaseMonth}
          />
        </div>
        <div className="goals-container">
          <ListField
            incommingList={Object.values(weekly_goals)}
            timeFrame={"week"}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            date={date}
            setDate={setDate}
            increase={increaseWeek}
            decrease={decreaseWeek}
          />
        </div>
      </div>
    </div>
  );
}
