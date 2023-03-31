const GET_REFLECTION = "reflections/GET_REFLECTION";
const ADD_REFLECTION = "reflections/ADD_REFLECTION";
const EDIT_REFLECTION = "reflections/EDIT_REFLECTION";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const getReflection = (reflection) => ({
  type: GET_REFLECTION,
  payload: reflection,
});

const addReflection = (reflection) => ({
  type: ADD_REFLECTION,
  payload: reflection,
});

const editReflection = (reflection) => ({
  type: EDIT_REFLECTION,
  payload: reflection,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getReflectionThunk = (searchParams) => async (dispatch) => {
  const searchParameters = new URLSearchParams(searchParams).toString();
  const res = await fetch(`/api/reflections?${searchParameters}`);

  if (res.ok) {
    const data = await res.json();
    if (data.not_found) return data;
    dispatch(getReflection(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addReflectionThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/reflections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addReflection(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editReflectionThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/reflections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editReflection(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initial State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {
  reflection: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REFLECTION:
      return { reflection: action.payload };
    case ADD_REFLECTION:
      return { reflection: action.payload };
    case EDIT_REFLECTION:
      return {
        reflection: state.reflection,
        ...action.payload,
      };
    default:
      return state;
  }
}
