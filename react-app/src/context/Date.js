import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDisplayTime } from "../store/tasks";

const DateContext = React.createContext();

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

export function DateProvider({ children }) {
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
  const [date, setDate] = useState(today);
  const [dateString, setDateString] = useState(
    new Date().toLocaleDateString("en-US", dateOptions)
  );

  const contextValue = {
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
  };

  //   useEffect(() => {
  //     setDate(new Date(year, month, day));
  //   }, [day]);

  //   useEffect(() => {
  //     setDateString(date.toLocaleDateString("en-US", dateOptions));
  //     const dueDate = {
  //       due_date: date.toLocaleDateString("en-US", dateOptions),
  //     };
  //   }, [date]);

  return (
    <>
      <DateContext.Provider value={contextValue}>
        {children}
      </DateContext.Provider>
    </>
  );
}

export const useDate = () => useContext(DateContext);
