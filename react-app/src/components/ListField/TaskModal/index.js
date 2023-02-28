import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskThunk, editTaskThunk } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateSubTask from "./CreateSubTask";
import "./EditListField.css";

export default function EditListField({ itemId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurringFrequency, setRecurringFrequency] = useState("");
  const [recurringDate, setRecurringDate] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (singleTask.id) {
      setName(singleTask.name);
      setDescription(singleTask.description);
      setPriority(singleTask.priority);
      setTaskDuration(singleTask.task_duration);
      setDueDate(singleTask.due_date);
      setRecurringFrequency(singleTask.recurring_frequency);
      setRecurringDate(singleTask.recurring_date);
      setAssignDate(singleTask.assign_date);
      setCompleted(singleTask.completed);
    }
  }, [singleTask]);

  // Formatting time constraints for google doc form
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const restrictedDay = year + "-" + addZero(month) + "-" + addZero(day);
  const restrictedDateInput =
    year +
    "-" +
    addZero(month) +
    "-" +
    addZero(day) +
    "T" +
    addZero(hour) +
    ":" +
    addZero(minute);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editItem = {
      ...singleTask,
      name,
      description,
      priority,
      task_duration: taskDuration,
      assign_date: assignDate,
      due_date: dueDate,
      recurring_frequency: recurringFrequency,
      recurring_date: recurringDate,
      completed: completed ? true : false,
    };

    const res = dispatch(editTaskThunk(editItem, singleTask.id));

    closeModal();
  };

  const cancelClick = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getTaskThunk(itemId));
  }, [dispatch]);

  const durationOptions = [
    <option value={null}>None</option>,
    <option value="15">15 minutes</option>,
    <option value="30">30 minutes</option>,
    <option value="45">45 minutes</option>,
  ];
  for (let i = 1; i < 5; i++) {
    for (let j = 0; j <= 45; j += 15) {
      const value = i * 60 + j;
      durationOptions.push(
        <option value={`${value}`}>
          {i} hours, {j} minutes
        </option>
      );
    }
  }

  return (
    <div className="edit-task-form-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} class="fa-solid fa-x x-close"></i>
      </div>
      <h1 className="edit-task-form-container-title">
        Edit Task: {singleTask.name}
      </h1>
      <div className="edit-task-form-body-container">
        <div className="edit-task-form-left-container">
          <form className="" onSubmit={handleSubmit} type="submit">
            <div className="edit-task-form-div-field">
              <label htmlFor="name" className="edit-task-form-labels">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className=""
                // className="song-input-field"
                required
                name="name"
                minLength="1"
                maxLength="20"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="edit-task-form-div-field">
              <label htmlFor="description" className="edit-task-form-labels">
                Description
              </label>
              <textarea
                className=""
                // className="song-input-field"
                name="description"
                maxLength="500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="edit-task-form-div-field">
              <label htmlFor="priority" className="edit-task-form-labels">
                Priority
              </label>
              <select
                className=""
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={null}>None</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>
            <div className="edit-task-form-div-field">
              <label htmlFor="add-goal" className="edit-task-form-labels">
                Add to a goal{" "}
                <span style={{ color: "red", border: "1px solid red" }}>
                  {" "}
                  NOT SET UP YET
                </span>
              </label>
              <select
                className=""
                name="add-goal"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={null}>None</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>
            <div className="edit-task-form-div-field">
              <label htmlFor="duration" className="edit-task-form-labels">
                Task Duration
              </label>
              <select
                className=""
                name="duration"
                value={taskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
              >
                {durationOptions}
              </select>
            </div>
            <div className="edit-task-form-div-field">
              <label
                htmlFor="recurring-frequency"
                className="edit-task-form-labels"
              >
                Recurring Frequency
              </label>
              <select
                className=""
                name="recurring-frequency"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={null}>None</option>
                <option value="1">Daily</option>
                <option value="7">Weekly</option>
                <option value="30">Monthly</option>
                <option value="365">Yearly</option>
              </select>
            </div>
            <div className="edit-task-form-div-field">
              <label htmlFor="recurring-date" className="edit-task-form-labels">
                Recurring Date Start
              </label>
              <input
                className=""
                name="recurring"
                type="datetime-local"
                min={restrictedDateInput}
                value={recurringDate}
                onChange={(e) => setRecurringDate(e.target.value)}
              ></input>
            </div>

            <div className="edit-task-form-div-field">
              <label htmlFor="start-date" className="edit-task-form-labels">
                Assign Date to Complete
              </label>
              <input
                className=""
                min={restrictedDateInput}
                name="start-date"
                type="datetime-local"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
              ></input>
            </div>
            <div className="edit-task-form-div-field">
              <label htmlFor="due-date" className="edit-task-form-labels">
                Due Date
              </label>
              <input
                className=""
                name="due-date"
                type="date"
                min={restrictedDay}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              ></input>
            </div>

            <div className="edit-task-check-box-container">
              <label htmlFor="completed" className="edit-task-form-labels">
                Completed?
              </label>
              <input
                className=""
                // className="song-input-field"
                name="completed"
                checked={completed}
                type="checkbox"
                onChange={() => setCompleted((prev) => !prev)}
              />
            </div>

            <div className="edit-task-buttons">
              <div className="cancel-button" onClick={cancelClick}>
                Cancel
              </div>
              <div
                className="cancel-button"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </div>
            </div>
          </form>
        </div>
        <div className="edit-task-form-right-container">
          <div className="edit-task-create-subtasks-container">
            <h4 className="create-subtask-header">Create a SubTask</h4>
            <CreateSubTask parentId={singleTask.id} />
          </div>
          <div className="edit-task-create-note-container"> Create Note</div>
        </div>
      </div>
    </div>
  );
}
