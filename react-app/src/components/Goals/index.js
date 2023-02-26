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
  // Use state here to determine date and pass down date object to children elements
  const currDate = new Date();
  const [month, setMonth] = useState(currDate.getMonth());
  const [year, setYear] = useState(currDate.getFullYear());
  const [day, setDay] = useState(currDate.getDate());
  const [date, setDate] = useState(currDate);

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
            timeFrame={"Year"}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            date={date}
            setDate={setDate}
          />
        </div>
        <div className="goals-container">
          <ListField
            incommingList={Object.values(monthly_goals)}
            timeFrame={"Monthly"}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            date={date}
            setDate={setDate}
          />
        </div>
        <div className="goals-container">
          <ListField
            incommingList={Object.values(weekly_goals)}
            timeFrame={"Weekly"}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
    </div>
  );
}
