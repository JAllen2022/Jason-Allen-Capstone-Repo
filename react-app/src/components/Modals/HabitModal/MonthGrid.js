import React from "react";
import moment from "moment";
import { useDate, getDisplayDates } from "../../../context/Date";
import { useSelector } from "react-redux";

const getFirstDayOfTheWeek = (year, week) => {
  const startOfWeek = moment(week + " " + year);
  const fetchDates = [];
  for (let i = 0; i < 7; i++) {
    fetchDates.push(
      startOfWeek.clone().add(i, "day").format("MMMM D").split(" ")
    );
  }
  return fetchDates;
};

export default function MonthGrid() {
  const { year, monthString: currentMonth } = useDate();
  const months = moment.months();
  const singleHabit = useSelector((state) => state.habits.habit);

  let completed = {};

  if (singleHabit.habit_instances) {
    const week_instances = Object?.values(singleHabit.habit_instances);
    week_instances.forEach((week) => {
      const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
        week;
      const getDates = getFirstDayOfTheWeek(
        year,
        week.week.slice(14).split(" - ")[0]
      );

      if (monday) completed[getDates[0][1]] = getDates[0][0];
      if (tuesday) completed[getDates[1][1]] = getDates[1][0];
      if (wednesday) completed[getDates[2][1]] = getDates[2][0];
      if (thursday) completed[getDates[3][1]] = getDates[3][0];
      if (friday) completed[getDates[4][1]] = getDates[4][0];
      if (saturday) completed[getDates[5][1]] = getDates[5][0];
      if (sunday) completed[getDates[6][1]] = getDates[6][0];
    });
  }

  return (
    <div className="month-grid">
      {months.map((month, index) => {
        const daysInMonth = moment().year(year).month(index).daysInMonth();
        const firstDayOfMonth = moment()
          .year(year)
          .month(index)
          .startOf("month")
          .day(); // get the day of the week for the first day of the month

        // create an array with the days of the month and empty cells to shift the days to the correct day of the week
        const daysArray = Array.from(
          { length: daysInMonth + firstDayOfMonth }, // sets length of new array
          (_, i) => (i < firstDayOfMonth ? null : i - firstDayOfMonth + 1) // (_,i) _ = current element. i is index of current element
        );

        return (
          <div
            key={index}
            className={`month-container ${
              month == currentMonth ? "current-month" : ""
            }`}
          >
            <h2 className="month-container-title">{month}</h2>
            <div className="day-grid">
              {daysArray.map((day, index) => (
                <div
                  key={index}
                  className={`day ${day === null ? "empty" : ""} ${
                    completed[day]
                      ? completed[day] == month
                        ? " month-circle"
                        : ""
                      : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
