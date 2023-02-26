// constants
const GET_GOALS = "goals/GET_GOALS";
const GET_GOAL = "goals/GET_GOAL";
const ADD_GOAL = "goals/ADD_GOAL";
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

const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: goal,
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

export const getGoalsThunk = () => async (dispatch) => {
  const res = await fetch("/api/goals/", {
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

export const editGoalThunk = (goal, goalId) => async (dispatch) => {
  console.log("track edit", 1);
  console.log("Checking inputs", goalId, goal);
  const res = await fetch(`/api/goals/${goalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });
  console.log("track edit", 2);

  if (res.ok) {
    console.log("track edit", 3);

    const data = await res.json();
    console.log("track edit 4", data);

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
  year: {},
  month: {},
  week: {},
  singleGoal: {},
};

export default function reducer(state = initialState, action) {
  const newState = {
    ...state,
  };
  switch (action.type) {
    case GET_GOALS:
      const { year, month, week } = action.payload;
      return { year, month, week, singleGoal: {} };
    case GET_GOAL:
      return { ...state, singleTask: action.payload };
    case ADD_GOAL:
      const { id, time_frame } = action.payload;

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

      // Adding a sub_goal
      // if (state.singleTask.id) {
      //   newState.singleTask = {
      //     ...state.singleTask,
      //     sub_tasks: { ...state.singleTask.sub_tasks, [id]: action.payload },
      //   };
      // }
      return newState;

    case EDIT_GOAL: {
      const { id, time_frame } = action.payload;
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

      // Need to update single task later
      //   singleTask: {
      //     ...state.singleTask,
      //     ...editedTask,
      //     sub_tasks: editedTask.sub_tasks || state.singleTask.sub_tasks,
      //   },
      // };

      return newState;
    }
    case DELETE_GOAL: {
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
