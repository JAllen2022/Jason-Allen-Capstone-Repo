// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_TASK_FILTER = "session/SET_TASK_FILTER";
const SET_YEAR_FILTER = "session/SET_YEAR_FILTER";
const SET_MONTH_FILTER = "session/SET_MONTH_FILTER";
const SET_WEEK_FILTER = "session/SET_WEEK_FILTER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setTaksFilter = (filter) => ({
  type: SET_TASK_FILTER,
  payload: filter,
});

const setYearFilter = (filter) => ({
  type: SET_YEAR_FILTER,
  payload: filter,
});
const setMonthFilter = (filter) => ({
  type: SET_MONTH_FILTER,
  payload: filter,
});

const setWeekFilter = (filter) => ({
  type: SET_WEEK_FILTER,
  payload: filter,
});

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = {
  user: null,
  taskFilter: {},
  yearFilter: {},
  monthFilter: {},
  weekFilter: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {
        user: user,
        taskFilter: user.task_filter,
        yearFilter: user.goal_year_filter,
        monthFilter: user.goal_month_filter,
        weekFilter: user.goal_week_filter,
      };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
