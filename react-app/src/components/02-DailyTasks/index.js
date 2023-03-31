import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk, setDisplayTime } from "../../store/tasks";
import ListField from "../ReusableComponents/ListField";
import RibbonBanner from "../../assets/RibbonBanner";
import Arrow from "../../assets/Arrow.js";
import Notebook from "../ReusableComponents/Notebook";
import "./Tasks.css";

export default function DailyTasks() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allTasks = useSelector((state) => state.tasks.currentTasks);
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
    setDateString(date.toLocaleDateString("en-US", dateOptions));
    const dueDate = {
      due_date: date.toLocaleDateString("en-US", dateOptions),
    };
    dispatch(getTasksThunk(dueDate));
    dispatch(setDisplayTime(dueDate));
  }, [date]);

  // useEffect(() => {
  //   const dueDate = {
  //     due_date: today.toLocaleDateString("en-US", dateOptions),
  //   };
  //   dispatch(getTasksThunk(dueDate));
  // }, [dispatch]);

  const previousDayClick = () => {
    setDay((prev) => prev - 1);
  };
  const nextDayClick = () => {
    setDay((prev) => prev + 1);
  };

  const leftPage = (
    <div className="task-left-page">
      <div className="title">
        <h1>To-Do</h1>
      </div>
      <div className="task-left-page-list-field">
        <ListField
          taskBool={true}
          dueDate={dateString}
          incomingList={Object.values(allTasks)}
          defaultFilter={user.task_filter}
        />
      </div>
    </div>
  );

  const rightPage = (
    <div className="ribbon-container">
      <RibbonBanner />
      <div className="ribbon-date">{dateString}</div>
    </div>
  );

  return (
    <div className="task-page-container">
      <Notebook leftPageContent={leftPage} rightPageContent={rightPage} />
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
