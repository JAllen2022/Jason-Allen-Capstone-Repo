// constants
const GET_TASKS = "tasks/GET_TASKS";
const GET_TASK = "tasks/GET_TASK";
const ADD_TASK = "tasks/ADD_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getTasks = (tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});

const getTask = (task) => ({
  type: GET_TASK,
  payload: task,
});

const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getTasksThunk = () => async (dispatch) => {
  const res = await fetch("/api/tasks/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getTasks(data.tasks));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const getTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getTask(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addTaskThunk = (task) => async (dispatch) => {
  console.log("right before dispatch", task);
  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  console.log("right after dispatch");

  if (res.ok) {
    const data = await res.json();
    dispatch(addTask(data));
    console.log("we are checking the data", data);
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editTaskThunk = (task, taskId) => async (dispatch) => {
  console.log("we here 1");

  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  console.log("we here 2", res);

  if (res.ok) {
    console.log("we here 3");

    const data = await res.json();
    dispatch(editTask(data));
  } else {
    console.log("we here 4");

    const data = await res.json();
    console.log("what are errors", data);
    if (data.errors) return res;
  }
};

export const deleteTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteTask(taskId));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

const initialState = {
  allTasks: {},
  task: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, allTasks: action.payload };
    case GET_TASK:
      return { ...state, task: action.payload };
    case ADD_TASK: {
      const newState = { ...state };
      newState.allTasks = { ...state.allTasks };
      newState.allTasks[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_TASK: {
      const editedTask = action.payload;
      const newState = { ...state };
      newState.allTasks = { ...newState.allTasks };
      newState.allTasks[editedTask.id] = {
        ...state.allTasks[editedTask.id],
        ...editedTask,
      };

      newState.singleTask = { ...state.singleTask, ...editedTask };
      return newState;
    }
    case DELETE_TASK: {
      const taskId = action.payload;
      const newState = { ...state };
      newState.allTasks = { ...newState.allTasks };
      newState.allTasks[taskId] = {
        ...state.allTasks[taskId],
      };

      delete newState.allTasks[taskId];
      newState.singleTask = {};
      return newState;
    }
    default:
      return state;
  }
}
