// Constraints
const GET_HABITS = "habits/GET_HABITS";
const GET_HABIT = "habits/GET_HABIT";
const CREATE_HABIT = "habits/CREATE_HABIT";
const EDIT_HABIT = "habits/EDIT_HABIT";
const ADD_INSTANCES = "habits/ADD_INSTANCES";
const DELETE_HABIT = "habits/DELETE_HABIT";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getHabits = (habits) => ({
  type: GET_HABITS,
  payload: habits,
});

const getHabit = (habit) => ({
  type: GET_HABIT,
  payload: habit,
});

const createHabit = (habit) => ({
  type: CREATE_HABIT,
  payload: habit,
});

const editHabit = (habit) => ({
  type: EDIT_HABIT,
  payload: habit,
});

const addInstances = (habit) => ({
  type: ADD_INSTANCES,
  payload: habit,
});

const deleteHabit = (habitId) => ({
  type: DELETE_HABIT,
  payload: habitId,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getHabitsThunk = (data) => async (dispatch) => {
  const searchParameters = new URLSearchParams(data).toString();
  const res = await fetch(`/api/habits?${searchParameters}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getHabits(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const getHabitThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/habits/${id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getHabit(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const createHabitThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createHabit(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editHabitThunk = (data, week) => async (dispatch) => {
  const searchParameters = new URLSearchParams(week).toString();
  const res = await fetch(`/api/habits/${data.id}?${searchParameters}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editHabit(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const createHabitInstancesThunk =
  (data, instanceId) => async (dispatch) => {
    const res = await fetch(`/api/habits/${instanceId}/instances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addInstances(data));
    } else {
      const data = await res.json();
      if (data.errors) return res;
    }
  };

export const deleteHabitThunk =
  (id, option, instanceId) => async (dispatch) => {
    const res = await fetch(`/api/habits/${id}/${option}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const passId = instanceId ? instanceId : id;
      dispatch(deleteHabit(passId));
    } else {
      const data = await res.json();
      if (data.errors) return res;
    }
  };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initial State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = {
  habits: {},
  habit: {},
  totalWeekAccomplished: 0,
  totalWeekGoal: 0,
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reducer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_HABITS:
      return {
        habits: action.payload.habits,
        habit: {},
        totalWeekAccomplished: action.payload.total_accomplished,
        totalWeekGoal: action.payload.total_goal,
      };
    case GET_HABIT:
      return { ...state, habit: action.payload };
    case CREATE_HABIT:
      newState.habits = {
        ...state.habits,
        [action.payload.id]: action.payload,
      };
      return newState;

    case EDIT_HABIT:
      newState.habits = {
        ...state.habits,
        [action.payload.habit_instance.id]: action.payload.habit_instance,
      };
      newState.totalWeekAccomplished =
        state.totalWeekAccomplished - action.payload.accomplished_difference;
      newState.totalWeekGoal =
        state.totalWeekGoal - action.payload.goal_difference;
      newState.habit = { ...state.habit, ...action.payload.habit };
      return newState;
    case ADD_INSTANCES:
      newState.habit = action.payload;
      return newState;
    case DELETE_HABIT:
      const id = action.payload;
      console.log("checking what this is ", action.payload);
      console.log("this", state.habits[id]);
      if (state.habits[id]) {
        newState.habits = { ...state.habits };
        delete newState.habits[id];
      }
      console.log("what is new state", newState);

      newState.habit = {};

      return newState;
    default:
      return state;
  }
}
