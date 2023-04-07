const GET_JOURNAL = "journals/GET_JOURNAL";
const ADD_JOURNAL = "journals/ADD_JOURNAL";
const EDIT_JOURNAL = "journals/EDIT_JOURNAL";
const RESET_JOURNAL = "journals/RESET_JOURNAL";
const ADD_IMAGE = "journals/ADD_IMAGE";
const REMOVE_IMAGE = "journals/REMOVE_IMAGE";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const getJournal = (data) => ({
  type: GET_JOURNAL,
  payload: data,
});

const resetJournal = () => ({
  type: RESET_JOURNAL,
});

const addJournal = (data) => ({
  type: ADD_JOURNAL,
  payload: data,
});

const editJournal = (journal) => ({
  type: EDIT_JOURNAL,
  payload: journal,
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  payload: image,
});

const removeImage = (id) => ({
  type: REMOVE_IMAGE,
  payload: id,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getJournalThunk = (searchParams) => async (dispatch) => {
  const searchParameters = new URLSearchParams(searchParams).toString();
  const res = await fetch(`/api/journals?${searchParameters}`);

  if (res.ok) {
    const data = await res.json();
    if (!data.journal) dispatch(resetJournal());
    else dispatch(getJournal(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addJournalThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/journals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addJournal(data));
    return data;
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const editJournalThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/journals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editJournal(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const addImageThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/images`, {
    method: "POST",
    body: data,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addImage(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

export const deleteImageThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/images/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeImage(id));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initial State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {
  journal: {},
  images: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOURNAL:
      return {
        journal: action.payload.journal,
        images: action.payload.images,
      };
    case ADD_JOURNAL:
      return {
        journal: action.payload.journal,
        images: action.payload.images,
      };
    case EDIT_JOURNAL:
      return {
        journal: state.journal,
        ...action.payload,
      };
    case RESET_JOURNAL:
      return initialState;
    case ADD_IMAGE:
      return {
        ...state,
        images: { ...state.images, [action.payload.id]: action.payload },
      };
    case REMOVE_IMAGE:
      const newState = { ...state, images: { ...state.images } };
      delete newState.images[action.payload];
      return newState;
    default:
      return state;
  }
}
