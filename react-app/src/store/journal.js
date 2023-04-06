const GET_JOURNAL = "journals/GET_JOURNAL";
const ADD_JOURNAL = "journals/ADD_JOURNAL";
const EDIT_JOURNAL = "journals/EDIT_JOURNAL";
const RESET_JOURNAL = "journals/RESET_JOURNAL";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const getJournal = (journal) => ({
  type: GET_JOURNAL,
  payload: journal,
});

const resetJournal = () => ({
  type: RESET_JOURNAL,
});

const addJournal = (journal) => ({
  type: ADD_JOURNAL,
  payload: journal,
});

const editJournal = (journal) => ({
  type: EDIT_JOURNAL,
  payload: journal,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Thunks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const getJournalThunk = (searchParams) => async (dispatch) => {
  const searchParameters = new URLSearchParams(searchParams).toString();
  const res = await fetch(`/api/journals?${searchParameters}`);

  if (res.ok) {
    const data = await res.json();
    if (!data.id) dispatch(resetJournal());
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initial State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {
  journal: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REFLECTION:
      return { journal: action.payload };
    case ADD_REFLECTION:
      return { journal: action.payload };
    case EDIT_REFLECTION:
      return {
        journal: state.journal,
        ...action.payload,
      };
    case RESET_REFLECTION:
      return initialState;
    default:
      return state;
  }
}
