// constants
const GET_TASKS = "tasks/GET_TASKS";
const GET_TASK = "tasks/GET_TASK";
const GET_ALL_TASKS = "task/GET_ALL_TASKS";
const ADD_TASK = "tasks/ADD_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";
const SET_DISPLAY_TIME = "tasks/SET_DISPLAY_TIME";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getTasks = (tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});

export const getTask = (task) => ({
  type: GET_TASK,
  payload: task,
});

const getAllTasks = (tasks) => ({
  type: GET_ALL_TASKS,
  payload: tasks,
});

const addTask = (task, currDate) => ({
  type: ADD_TASK,
  payload: { task, currDate },
});

const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const setDisplayTime = (time) => ({
  type: SET_DISPLAY_TIME,
  payload: time,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getTasksThunk = (data) => async (dispatch) => {
  const searchParameters = new URLSearchParams(data).toString();
  const res = await fetch(`/api/tasks?${searchParameters}`, {
    method: "get",
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

export const getAllTasksThunk = () => async (dispatch) => {
  const res = await fetch(`/api/tasks/all`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTasks(data.all_tasks));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addTaskThunk = (task, currDate) => async (dispatch) => {
  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addTask(data, currDate));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editTaskThunk = (task, taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editTask(data));
  } else {
    const data = await res.json();
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
  displayDay: {},
  currentTasks: {},
  singleTask: {},
  allTasks: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, currentTasks: action.payload };
    case GET_TASK:
      return { ...state, singleTask: action.payload };
    case GET_ALL_TASKS:
      return { ...state, allTasks: action.payload };
    case ADD_TASK: {
      // Refactored
      const { task, currDate } = action.payload;
      const { id } = task;
      const newState = {
        ...state,
      };
      // Only add to current task list if date if the current date is the same
      if (task.due_date == currDate) {
        newState.currentTasks = {
          ...state.currentTasks,
          [id]: task,
        };
      }

      if (state.singleTask.id) {
        newState.singleTask = {
          ...state.singleTask,
          sub_tasks: { ...state.singleTask.sub_tasks, [id]: task },
        };
        if (task.parent) {
          newState.singleTask.parent = {
            parent: { ...state.singleTask.parent, ...task.parent },
          };
        }
      }
      return newState;
      // Old Code
      // const newState = { ...state };
      // newState.allTasks = { ...state.allTasks };
      // newState.allTasks[action.payload.id] = action.payload;

      // newState.singleTask = { ...state.singleTask };
      // if (state.singleTask.id) {
      //   newState.singleTask.sub_tasks = { ...state.singleTask.sub_tasks };
      //   newState.singleTask.sub_tasks[action.payload.id] = action.payload;
      // }
      // return newState;
    }
    case EDIT_TASK: {
      const editedTask = action.payload;
      const { id } = editedTask;
      const newState = {
        ...state,
        currentTasks: { ...state.currentTasks },
      };

      if (state.displayDay.due_date !== editedTask.due_date) {
        delete newState.currentTasks[id];
      } else {
        newState.currentTasks[id] = {
          ...state.currentTasks[id],
          ...editedTask,
        };
      }
      newState.singleTask = { ...state.singleTask };

      if (newState.singleTask.id) {
        if (id === state.singleTask.id) {
          newState.singleTask = { ...editedTask };
        } else if (newState.singleTask.sub_tasks[id]) {
          newState.singleTask.sub_tasks = {
            ...state.singleTask.sub_tasks,
            [id]: {
              ...state.singleTask.sub_tasks[id],
              ...editedTask,
            },
          };
        }
      }

      return newState;
      //   const editedTask = action.payload;
      //   const newState = { ...state };
      //   newState.allTasks = { ...newState.allTasks };
      //   newState.allTasks[editedTask.id] = {
      //     ...state.allTasks[editedTask.id],
      //     ...editedTask,
      //   };

      //   newState.singleTask = { ...state.singleTask, ...editedTask };
      //   newState.singleTask.sub_tasks = { ...editedTask.sub_tasks };
      //   return newState;
    }
    case DELETE_TASK: {
      const taskId = action.payload;
      const { currentTasks, singleTask } = state;
      const newState = {
        currentTasks: { ...currentTasks },
        singleTask: { ...singleTask },
      };

      delete newState.currentTasks[taskId];

      if (singleTask.id === taskId) {
        newState.singleTask = {};
      } else if (singleTask.id && singleTask.sub_tasks[taskId]) {
        newState.singleTask.sub_tasks = { ...singleTask.sub_tasks };
        delete newState.singleTask.sub_tasks[taskId];
      }

      return newState;
    }
    case SET_DISPLAY_TIME:
      return { ...state, displayDay: action.payload };
    default:
      return state;
  }
}
