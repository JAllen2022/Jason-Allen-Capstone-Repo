// Constraints
const GET_HABITS = "habits/GET_HABITS";
const GET_HABIT = "habits/GET_HABIT";
const CREATE_HABIT = "habits/CREATE_HABIT";
const EDIT_HABIT = "habits/EDIT_HABIT";
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
    dispatch(getHabits(data.habits));
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

export const editHabitThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/habits/${data.id}`, {
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

export const deleteHabitThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/habits/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteHabit(id));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initial State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = {
  habits: {},
  habit: {},
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reducer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_HABITS:
      return { habits: action.payload, habit: {} };
    case GET_HABIT:
      return { ...state, habit: action.payload };
    case CREATE_HABIT:
      newState.habits = {
        ...state.habits,
        [action.payload.id]: action.payload,
      };
      return newState;
    case EDIT_HABIT:
      return newState;
    case DELETE_HABIT:
      return newState;
    default:
      return state;
  }
}
