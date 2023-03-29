import React from "react";
import moment from "moment";
import { useDate, getDisplayDates } from "../../../context/Date";
import { useSelector } from "react-redux";
import { getWeekDates } from "../../../context/Date";

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
      const getDates = getWeekDates(year, week.week);

      if (monday) {
        if (completed[getDates[0][0]])
          completed[getDates[0][0]].add(getDates[0][1]);
        else {
          completed[getDates[0][0]] = new Set([getDates[0][1]]);
        }
      }
      if (tuesday) {
        if (completed[getDates[1][0]])
          completed[getDates[1][0]].add(getDates[1][1]);
        else {
          completed[getDates[1][0]] = new Set([getDates[1][1]]);
        }
      }
      if (wednesday) {
        if (completed[getDates[2][0]])
          completed[getDates[2][0]].add(getDates[2][1]);
        else {
          completed[getDates[2][0]] = new Set([getDates[2][1]]);
        }
      }
      if (thursday) {
        if (completed[getDates[3][0]])
          completed[getDates[3][0]].add(getDates[3][1]);
        else {
          completed[getDates[3][0]] = new Set([getDates[3][1]]);
        }
      }
      if (friday) {
        if (completed[getDates[4][0]])
          completed[getDates[4][0]].add(getDates[4][1]);
        else {
          completed[getDates[4][0]] = new Set([getDates[4][1]]);
        }
      }
      if (saturday) {
        if (completed[getDates[5][0]])
          completed[getDates[5][0]].add(getDates[5][1]);
        else {
          completed[getDates[5][0]] = new Set([getDates[5][1]]);
        }
      }
      if (sunday) {
        if (completed[getDates[6][0]])
          completed[getDates[6][0]].add(getDates[6][1]);
        else {
          completed[getDates[6][0]] = new Set([getDates[6][1]]);
        }
      }
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
              {daysArray.map((day, index) => {
                return (
                  <div
                    key={index}
                    className={`day ${day === null ? "empty" : ""} ${
                      completed[month]
                        ? completed[month].has(day?.toString())
                          ? " month-circle"
                          : ""
                        : ""
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
