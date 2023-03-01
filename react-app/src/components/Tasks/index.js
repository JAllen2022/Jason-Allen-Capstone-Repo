import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk } from "../../store/tasks";
import ListField from "../ListField";
import RibbonBanner from "../../Assets/RibbonBanner";
import Arrow from "../../Assets/Arrow";
import "./Tasks.css";

export default function Tasks() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const today = new Date();
  const dateOptions = {
    weekday: "short",
    year: "2-digit",
    month: "long",
    day: "numeric",
  };

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(
    new Date().toLocaleDateString("en-US", dateOptions)
  );

  useEffect(() => {
    setDate(new Date(year, month, day));
  }, [day]);

  useEffect(() => {
    setDateString(date.toLocaleDateString("en-US", dateOptions))
  }, [date]);
  console.log("checking date string", year, month, day);
  console.log("checking date string date datestring", date, dateString);

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  const previousDayClick = () => {
    setDay((prev) => prev - 1);
  };
  const nextDayClick = () => {
    setDay((prev) => prev + 1);
  };

  return (
    <div className="task-page-container">
      <div class="magazine">
        <div class="left-page">
          <div class="title">
            <h1>To-Do</h1>
          </div>
          <ListField taskBool={true} incommingList={Object.values(allTasks)} />
        </div>
        <div class="right-page">
          <div className="ribbon-container">
            <RibbonBanner />
            <div className="ribbon-date">{dateString}</div>
          </div>
        </div>
      </div>
      <div className="arrow-container">
        {" "}
        <div className="arrow-left-right">
          <Arrow classString={"left-arrow"} onClick={previousDayClick} />
          <Arrow classString={"right-arrow"} onClick={nextDayClick} />
        </div>
        <div className="arrow-descriptions">
          <div className="arrow-text" onClick={previousDayClick}>
            Previous Day
          </div>
          <div className="arrow-text" onClick={nextDayClick}>
            Next Day
          </div>
        </div>
      </div>
    </div>
  );
}
