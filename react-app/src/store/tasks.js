// constants
const GET_TASKS = "tasks/GET_TASKS";
const GET_TASK = "tasks/GET_TASK";
const GET_ALL_TASKS = "task/GET_ALL_TASKS";
const GET_WEEK_TASKS = "goals/GET_WEEK_TASKS";
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

const getWeekTasks = (tasks) => ({
  type: GET_WEEK_TASKS,
  payload: tasks,
});

const addTask = (task, currDate, weekday) => ({
  type: ADD_TASK,
  payload: { task, currDate, weekday },
});

const editTask = (editedTask, weekday, deleteFromWeek) => ({
  type: EDIT_TASK,
  payload: { editedTask, weekday, deleteFromWeek },
});

const deleteTask = (taskId, weekday) => ({
  type: DELETE_TASK,
  payload: { taskId, weekday },
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

export const getWeekTasksThunk = (data) => async (dispatch) => {
  const searchParameters = new URLSearchParams(data).toString();
  const res = await fetch(`/api/tasks/week?${searchParameters}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getWeekTasks(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addTaskThunk = (task, currDate, weekday) => async (dispatch) => {
  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addTask(data, currDate, weekday));
    return data;
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editTaskThunk =
  (task, taskId, weekday, deleteFromWeek) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    console.log("we here 12345 ", deleteFromWeek);

    if (res.ok) {
      console.log("we here 12346 ");

      const data = await res.json();
      dispatch(editTask(data, weekday, deleteFromWeek));
    } else {
      const data = await res.json();
      if (data.errors) return res;
    }
  };

export const deleteTaskThunk = (taskId, weekday) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteTask(taskId, weekday));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initial State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const initialState = {
  displayDay: {},
  currentTasks: {},
  singleTask: {},
  allTasks: {},
  mon: {},
  tue: {},
  wed: {},
  thu: {},
  fri: {},
  sat: {},
  sun: {},
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reducer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, currentTasks: action.payload };
    case GET_TASK:
      return { ...state, singleTask: action.payload };
    case GET_ALL_TASKS:
      return { ...state, allTasks: action.payload };
    case GET_WEEK_TASKS:
      const { mon, tue, wed, thu, fri, sat, sun } = action.payload;
      return { ...state, mon, tue, wed, thu, fri, sat, sun };
    case ADD_TASK: {
      // Refactored
      const { task, currDate, weekday } = action.payload;
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

      if (weekday) {
        newState[weekday][task.id] = task;
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
      const { editedTask, weekday, deleteFromWeek } = action.payload;
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
        } else if (newState.singleTask?.sub_tasks[id]) {
          newState.singleTask.sub_tasks = {
            ...state.singleTask.sub_tasks,
            [id]: {
              ...state.singleTask.sub_tasks[id],
              ...editedTask,
            },
          };
        }
      }
      if (weekday) {
        newState[weekday] = {
          ...state[weekday],
        };
        console.log("are we doing anything", weekday);
        newState[weekday][editedTask.id] = editedTask;
        console.log("what is the new newState", newState[weekday]);
        if (deleteFromWeek) {
          const oldWeekDay = state.singleTask.due_date
            .slice(0, 3)
            .toLowerCase();
          console.log("checking old week day", oldWeekDay);
          newState[oldWeekDay] = { ...state[oldWeekDay] };
          delete newState[oldWeekDay][editedTask.id];
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
      const { taskId, weekday } = action.payload;
      const { singleTask } = state;
      const newState = {
        ...state,
        currentTasks: { ...state.currentTasks },
        singleTask: { ...state.singleTask },
      };

      delete newState.currentTasks[taskId];

      if (singleTask.id === taskId) {
        newState.singleTask = {};
      } else if (singleTask.id && singleTask.sub_tasks[taskId]) {
        newState.singleTask.sub_tasks = { ...singleTask.sub_tasks };
        delete newState.singleTask.sub_tasks[taskId];
      }

      if (weekday) {
        newState[weekday] = {
          ...state[weekday],
        };
        delete newState[weekday][taskId];
      }

      return newState;
    }
    case SET_DISPLAY_TIME:
      return { ...state, displayDay: action.payload };
    default:
      return state;
  }
}
