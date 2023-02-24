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
    dispatch(getGoals(data.goals));
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
  const res = await fetch(`/api/goals/${goalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });

  if (res.ok) {
    const data = await res.json();
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
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GOALS:
      return { ...state, allTasks: action.payload };
    case GET_GOAL:
      return { ...state, singleTask: action.payload };
    case ADD_GOAL: {
      const { id } = action.payload;
      const newState = {
        ...state,
        allTasks: {
          ...state.allTasks,
          [id]: action.payload,
        },
      };

      if (state.singleTask.id) {
        newState.singleTask = {
          ...state.singleTask,
          sub_tasks: { ...state.singleTask.sub_tasks, [id]: action.payload },
        };
      }
      return newState;
    }
    case EDIT_GOAL: {
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
        singleTask: {
          ...state.singleTask,
          ...editedTask,
          sub_tasks: editedTask.sub_tasks || state.singleTask.sub_tasks,
        },
      };

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
