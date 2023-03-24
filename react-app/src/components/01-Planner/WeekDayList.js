import ListItem from "../ReusableComponents/ListField/ListItem";
import { useEffect, useState } from "react";
import { addTaskThunk } from "../../store/tasks";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function WeekDayList({ dayString, fetchDate }) {
  const [name, setName] = useState("");
  const weekDay = dayString.slice(0, 3);
  const dateToCheck = moment(fetchDate, "ddd, MMMM DD, YY");
  const currentDate = moment();

  const taskList = useSelector((state) => state.tasks[weekDay.toLowerCase()]);
  const shortDate = dayString.slice(4);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListItem = {
      name,
      due_date: fetchDate,
      priority: "4",
    };

    // Validation to check that a task isn't a character of just spaces
    const emptyStringCheck = name.split(" ").join("");
    if (name.length && emptyStringCheck) {
      //Dispatch create task thunk
      const res = dispatch(
        addTaskThunk(newListItem, fetchDate, weekDay.toLowerCase())
      );

      setName("");
    }
  };

  const priorities = [1, 2, 3, 4];
  const allTasksCompleted = [];
  const allTasksNotCompleted = [];
  let displayBody = [];
  let visibleListSize = 5;

  if (taskList) {
    const sortList = Object.values(taskList);
    const prioritySorted = priorities.map((prio) => {
      return sortList
        .filter((ele) => ele.priority === prio.toString() && !ele.completed)
        .sort((x, y) =>
          x.name.localeCompare(y.name, undefined, { sensitivity: "base" })
        );
    });

    const prioritySortedCompleted = priorities.map((prio) => {
      return sortList
        .filter((ele) => ele.priority === prio.toString() && ele.completed)
        .sort((x, y) =>
          x.name.localeCompare(y.name, undefined, { sensitivity: "base" })
        );
    });
    prioritySorted.forEach((ele) => allTasksNotCompleted.push(...ele));
    prioritySortedCompleted.forEach((ele) => allTasksCompleted.push(...ele));

    const compiledList = [...allTasksNotCompleted, ...allTasksCompleted];

    compiledList.forEach((ele) =>
      displayBody.push(
        <ListItem
          key={`${ele.name}${ele.id}`}
          taskBool={true}
          item={ele}
          weekday={weekDay.toLowerCase()}
        />
      )
    );
    if (currentDate.isSameOrBefore(dateToCheck, "day")) {
      displayBody.push(
        <div className="weekday-add-list-container">
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
            <input
              type="submit"
              style={{ position: "absolute", display: "none" }}
            />
          </form>
        </div>
      );
    }
  }

  visibleListSize = visibleListSize - displayBody.length;
  for (let i = 0; i < visibleListSize; i++) {
    displayBody.push(<ListItem empty={true} />);
  }

  return (
    <div className="week-day-list-container">
      <div className="week-day-list-title">
        <div>{weekDay}</div>
        <div>{shortDate}</div>
      </div>
      <div className="week-day-list-body">{displayBody}</div>
    </div>
  );
}
