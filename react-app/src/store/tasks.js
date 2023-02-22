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

const initialState = { user: null };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getTasksThunk = () => async (dispatch) => {
  const res = await fetch("/api/tasks/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await response.json();
    dispatch(getTasks(data));
  } else {
    const data = await response.json();
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
    const data = await response.json();
    dispatch(getTask(data));
  } else {
    const data = await response.json();
    if (data.errors) return res;
  }
};

export const editTaskThunk = (task, taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const data = await response.json();
    dispatch(editTask(data));
  } else {
    const data = await response.json();
    if (data.errors) return res;
  }
};

export const deleteTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await response.json();
    dispatch(deleteTask(data));
  } else {
    const data = await response.json();
    if (data.errors) return res;
  }
};

initialState = {
  allTasks: {},
  task: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, allTasks: action.payload };
    case GET_TASK:
      return { ...state, task: action.payload };
    case EDIT_TASK: {
      const editedTask = action.payload;
      newState = { ...state };
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
      newState = { ...state };
      newState.allTasks = { ...newState.allTasks };
      newState.allTasks[editedTask.id] = {
        ...state.allTasks[editedTask.id],
      };

      delete newState.allTasks[editedTask.id];
      newState.singleTask = {};
      return newState;
    }
    default:
      return state;
  }
}
