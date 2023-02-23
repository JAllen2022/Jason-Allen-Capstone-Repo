import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk } from "../../store/tasks";
import ListField from "../ListField";
import "./Tasks.css";

export default function Tasks() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.allTasks);
  console.log("checking taskls", Object.values(allTasks));

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  return (
    <>
      <h1>All Tasks</h1>
      <ListField taskBool={true} incommingList={Object.values(allTasks)} />
    </>
  );
}
