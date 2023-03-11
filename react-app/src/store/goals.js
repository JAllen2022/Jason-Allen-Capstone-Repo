// constants
const GET_GOALS = "goals/GET_GOALS";
const GET_GOAL = "goals/GET_GOAL";
const GET_ALL_GOALS = "goals/GET_ALL_GOALS";
const ADD_GOAL = "goals/ADD_GOAL";
const ADD_SUB_TASK = "goals/ADD_SUB_TASK";
const EDIT_SUB_TASK = "goals/EDIT_SUB_TASK";
const DELETE_SUB_TASK = "goals/DELETE_SUB_TASK";
const ADD_DISPLAY_TIME = "goals/ADD_DISPLAY_TIME";

const EDIT_GOAL = "goals/EDIT_GOAL";
const DELETE_GOAL = "goals/DELETE_GOAL";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getGoals = (goals) => ({
  type: GET_GOALS,
  payload: goals,
});

const getGoal = (goal) => ({
  type: GET_GOAL,
  payload: goal,
});

const getAllGoals = (goals) => ({
  type: GET_ALL_GOALS,
  payload: goals,
});

const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: goal,
});

const addSubTask = (task) => ({
  type: ADD_SUB_TASK,
  payload: task,
});

export const addDisplayTime = (year, month, week) => ({
  type: ADD_DISPLAY_TIME,
  payload: { year, month, week },
});

export const editSubTask = (task) => ({
  type: EDIT_SUB_TASK,
  payload: task,
});

export const deleteGoalSubTask = (task) => ({
  type: DELETE_SUB_TASK,
  payload: task,
});

const editGoal = (goal) => ({
  type: EDIT_GOAL,
  payload: goal,
});

const deleteGoal = (goalId) => ({
  type: DELETE_GOAL,
  payload: goalId,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getGoalsThunk = (data) => async (dispatch) => {
  const searchParameters = new URLSearchParams(data).toString();
  const res = await fetch(`/api/goals?${searchParameters}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getGoals(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const getGoalThunk = (goalId) => async (dispatch) => {
  const res = await fetch(`/api/goals/${goalId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getGoal(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const getAllGoalsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/goals/all`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllGoals(data.all_goals));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addGoalThunk = (goal) => async (dispatch) => {
  const res = await fetch(`/api/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addGoal(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addGoalSubTaskThunk = (task) => async (dispatch) => {
  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const task = await res.json();
    dispatch(addSubTask(task));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editGoalThunk = (goal, goalId) => async (dispatch) => {
  // console.log("track edit", 1);
  // console.log("Checking inputs", goalId, goal);
  const res = await fetch(`/api/goals/${goalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });
  // console.log("track edit", 2);

  if (res.ok) {
    // console.log("track edit", 3);

    const data = await res.json();
    // console.log("track edit 4", data);

    dispatch(editGoal(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const deleteGoalThunk = (goalId) => async (dispatch) => {
  const res = await fetch(`/api/goals/${goalId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteGoal(goalId));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

const initialState = {
  displaytime: {},
  year: {},
  month: {},
  week: {},
  singleGoal: {},
  allGoals: {},
};

export default function reducer(state = initialState, action) {
  const newState = {
    ...state,
  };
  switch (action.type) {
    case GET_ALL_GOALS:
      newState.allGoals = action.payload;
      return newState;
    case GET_GOALS:
      const { year, month, week } = action.payload;
      return {
        year,
        month,
        week,
        singleGoal: {},
        displaytime: { ...state.displaytime },
        allGoals: { ...state.allGoals },
      };
    case GET_GOAL:
      return { ...state, singleGoal: action.payload };
    case ADD_GOAL:
      const { id, time_frame, parent_id } = action.payload;

      if (time_frame === "year") {
        newState.year = { ...state.year };
        newState.year[id] = action.payload;
      } else if (time_frame === "month") {
        newState.month = { ...state.month };
        newState.month[id] = action.payload;
      } else if (time_frame === "week") {
        newState.week = { ...state.week };
        newState.week[id] = action.payload;
      }

      if (state.singleGoal.id === parent_id) {
        newState.singleGoal = {
          ...state.singleGoal,
          sub_goals: { ...state.singleGoal.sub_goals, [id]: action.payload },
        };
      }

      // Adding a sub_goal
      // if (state.singleTask.id) {
      //   newState.singleTask = {
      //     ...state.singleTask,
      //     sub_tasks: { ...state.singleTask.sub_tasks, [id]: action.payload },
      //   };
      // }
      return newState;

    case ADD_SUB_TASK: {
      const task = action.payload;
      const id = task.id;
      // Adding a sub_task
      if (state.singleGoal.id) {
        newState.singleGoal = {
          ...state.singleGoal,
          sub_tasks: { ...state.singleGoal.sub_tasks, [id]: task },
        };
      }
      return newState;
    }
    case EDIT_GOAL: {
      const editedGoal = action.payload;
      const { id, time_frame } = action.payload;
      newState.year = { ...state.year };
      newState.month = { ...state.month };
      newState.week = { ...state.week };

      // Here, we are checking to see if the CURRENT Goal, i.e. the single goal state, is changing it's current date
      if (
        state.singleGoal.time_frame !== editedGoal.time_frame ||
        state.singleGoal.due_date !== editedGoal.due_date
      ) {
        //find the time frame it's in and delete it
        if (state.year[id]) {
          delete newState.year[id];
        } else if (state.month[id]) {
          delete newState.month[id];
        } else if (state.week[id]) {
          delete newState.week[id];
        }

        if (
          time_frame === "year" &&
          state.displaytime.year === editedGoal.year
        ) {
          newState.year[id] = action.payload;
        } else if (
          time_frame === "month" &&
          state.displaytime.month === editedGoal.month
        ) {
          newState.month[id] = action.payload;
        } else if (
          time_frame === "week" &&
          state.displaytime.week === editedGoal.week
        ) {
          newState.week[id] = action.payload;
        }

        newState.singleGoal = { ...state.singleGoal, ...editedGoal };

        return newState;
      }

      // Then we can continue with our previous state updates
      // Here we are updating all state
      if (time_frame === "year") {
        newState.year = { ...state.year };
        newState.year[id] = editedGoal;
      } else if (time_frame === "month") {
        newState.month = { ...state.month };
        newState.month[id] = editedGoal;
      } else if (time_frame === "week") {
        newState.week = { ...state.week };
        newState.week[id] = editedGoal;
      }
      // This indicates that it is a sub-goal being edited for when we mark something complete in a parent goal
      if (newState.singleGoal.id === editedGoal.parent_id) {
        newState.singleGoal = {
          ...state.singleGoal,
          sub_goals: {
            ...state.singleGoal.sub_goals,
            [id]: { ...state.singleGoal.sub_goals[id], ...editedGoal },
          },
        };
        // This indicates a current goal is being edited
      } else if (newState.singleGoal.id === id) {
        newState.singleGoal = { ...state.singleGoal };
        newState.singleGoal = editedGoal;
      }

      return newState;
    }
    case DELETE_SUB_TASK: {
      const task = action.payload;
      const id = task.id;
      // Adding a sub_task
      if (state.singleGoal.id) {
        newState.singleGoal = {
          ...state.singleGoal,
          sub_tasks: { ...state.singleGoal.sub_tasks },
        };
        delete newState.singleGoal.sub_tasks[id];
      }
      return newState;
    }

    case EDIT_SUB_TASK: {
      const task = action.payload;
      const id = task.id;
      // Adding a sub_task
      if (state.singleGoal.id) {
        newState.singleGoal = {
          ...state.singleGoal,
          sub_tasks: {
            ...state.singleGoal.sub_tasks,
            [id]: { ...state.singleGoal.sub_tasks[id], ...task },
          },
        };
      }
      return newState;
    }

    case DELETE_GOAL: {
      const goalId = action.payload;
      const { year, month, week, singleGoal } = state;
      if (newState.year[goalId]) {
        newState.year = { ...state.year };
        delete newState.year[goalId];
      } else if (newState.month[goalId]) {
        newState.month = { ...state.month };
        delete newState.month[goalId];
      } else if (newState.week[goalId]) {
        newState.week = { ...state.week };
        delete newState.week[goalId];
      }

      if (newState.singleGoal.id === goalId) newState.singleGoal = {};
      else if (
        newState.singleGoal.id &&
        newState.singleGoal?.sub_goals[goalId]
      ) {
        newState.singleGoal = {
          ...state.singleGoal,
          sub_goals: { ...state.singleGoal.sub_goals },
        };
        delete newState.singleGoal.sub_goals[goalId];
      }

      return newState;
    }
    case ADD_DISPLAY_TIME:
      newState.displaytime = { ...action.payload };
      return newState;

    default:
      return state;
  }
}
