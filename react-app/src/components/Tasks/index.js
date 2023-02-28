import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk } from "../../store/tasks";
import ListField from "../ListField";
import "./Tasks.css";

export default function Tasks() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.allTasks);

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  <>
    <h1>All Tasks</h1>
  </>;

  return (
    <>
      <div class="magazine">
        <div class="left-page">
          <div class="title">
            <h1>To-Do</h1>
          </div>
          <ListField taskBool={true} incommingList={Object.values(allTasks)} />
        </div>
        <div class="right-page">
          <div class="content"></div>
        </div>
      </div>
      ;
    </>
  );
}
