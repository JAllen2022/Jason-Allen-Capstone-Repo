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

export const getTask = (task) => ({
  type: GET_TASK,
  payload: task,
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
  allTasks: {},
  singleTask: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, allTasks: action.payload };
    case GET_TASK:
      return { ...state, singleTask: action.payload };
    case ADD_TASK: {
      // Refactored
      const { task, currDate } = action.payload;
      const { id } = task;
      const newState = {
        ...state,
      };
      // Only add if date if the current date is the same
      if (task.due_date == currDate) {
        newState.allTasks = {
          ...state.allTasks,
          [id]: task,
        };
      }
      console.log("checking this", task.due_date, currDate);

      if (state.singleTask.id) {
        newState.singleTask = {
          ...state.singleTask,
          sub_tasks: { ...state.singleTask.sub_tasks, [id]: task },
        };
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
      // Refactored
      const editedTask = action.payload;
      const { id } = editedTask;
      const newState = {
        ...state,
        allTasks: {
          ...state.allTasks,
          [id]: {
            ...state.allTasks[id],
            ...editedTask,
          },
        },
      };
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
      const { allTasks, singleTask } = state;
      const newState = {
        allTasks: { ...allTasks },
        singleTask: { ...singleTask },
      };

      delete newState.allTasks[taskId];

      if (singleTask.id === taskId) {
        newState.singleTask = {};
      } else if (singleTask.id && singleTask.sub_tasks[taskId]) {
        newState.singleTask.sub_tasks = { ...singleTask.sub_tasks };
        delete newState.singleTask.sub_tasks[taskId];
      }

      return newState;
    }
    default:
      return state;
  }
}
