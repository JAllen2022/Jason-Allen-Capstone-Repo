import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useDate } from "../../context/Date";
import { getCurrentWeek } from "../03-Goals";
import { getGoalsThunk, addDisplayTime } from "../../store/goals";
import Notebook from "../ReusableComponents/Notebook";
import Arrow from "../../Assets/Arrow";
import "./Planner.css";

export default function Planner() {
  const dispatch = useDispatch();
  const { year, setYear, month, setMonth, day, setDay, date, setDate } =
    useDate();
  const monthstring = date.toLocaleString("default", { month: "long" });
  const week = getCurrentWeek(date).slice(14);

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

  const decreaseWeek = () => setDay(day - 7);
  const increaseWeek = () => setDay(day + 7);

  const leftPage = <div>Hello</div>;
  const rightPage = <div>Hello</div>;

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
