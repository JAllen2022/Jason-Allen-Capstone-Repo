import React, { useState, useContext } from "react";
import moment from "moment";

const DateContext = React.createContext();

export function getDisplayDates(date) {
  // Create a moment object from the input date
  const startOfWeek = moment(date);

  // Get the Monday of the week that includes the input date
  startOfWeek.isoWeekday(1);

  // Get an array of dates for the week
  const displayDates = [];
  const fetchDates = [];
  for (let i = 0; i < 7; i++) {
    const dayString = startOfWeek.clone().add(i, "day").format("ddd");
    const dateString = startOfWeek.clone().add(i, "day").format("M/D");
    displayDates.push(`${dayString} ${dateString}`);
    fetchDates.push(
      startOfWeek.clone().add(i, "day").format("ddd, MMMM D, YY")
    );
  }
  // Example return for displayDates ['Mon 3/13', 'Tues 3/14', ...etc to Sunday]
  // Example return for fetchDates ['Mon, March 13, 23', ... etc to Sunday]

  return [fetchDates, displayDates];
}

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

export function getWeekStrings(year, weekString, numberOfWeeks) {
  const currentDate = getCurrentDate(year, weekString);

  const returnArray = [];

  for (let i = 1; i <= numberOfWeeks; i++) {
    const startOfWeek = moment(currentDate).add(i, "weeks");
    const endOfWeek = moment(startOfWeek).add(6, "days");
    const formattedString =
      "Weekly Goals: " +
      startOfWeek.format("MMMM D") +
      " - " +
      endOfWeek.format("MMMM D");
    const currentYear = moment(currentDate).format("YYYY");
    const currentMonth = moment(currentDate).format("MMMM, YYYY");

    // NEED TO ADD CURRENT YEAR AND MONTH STRING INTO THIS ARRAY AS WELL
    returnArray.push([currentYear, currentMonth, formattedString]);
  }

  return returnArray;
}

export function getCurrentDate(year, weekString) {
  const week = weekString.slice(14).split(" - ")[0];
  const startOfWeek = moment(week + " " + year);
  return startOfWeek;
}

export const getWeekDates = (year, weekString) => {
  const startOfWeek = getCurrentDate(year, weekString);
  const fetchDates = [];
  for (let i = 0; i < 7; i++) {
    fetchDates.push(
      startOfWeek.clone().add(i, "day").format("MMMM D").split(" ")
    );
  }
  console.log("checking weekDates", fetchDates);
  return fetchDates;
};

export function DateProvider({ children }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [date, setDate] = useState(today);
  const [fetchDates, displayDates] = getDisplayDates(date);
  const monthString = date.toLocaleString("default", { month: "long" });
  const monthDisp = `${monthString}, ${date.getFullYear()}`;
  const weekString = getCurrentWeek(date);

  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay =
    today.getFullYear() +
    "-" +
    addZero(today.getMonth() + 1) +
    "-" +
    addZero(today.getDate());

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateOptions = {
    weekday: "short",
    year: "2-digit",
    month: "long",
    day: "numeric",
  };
  const [dateString, setDateString] = useState(
    new Date().toLocaleDateString("en-US", dateOptions)
  );

  const contextValue = {
    restrictedDay,
    weekdays,
    dateOptions,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    date,
    setDate,
    dateString,
    setDateString,
    fetchDates,
    displayDates,
    monthDisp,
    monthString,
    weekString,
  };

  return (
    <>
      <DateContext.Provider value={contextValue}>
        {children}
      </DateContext.Provider>
    </>
  );
}

export const useDate = () => useContext(DateContext);
