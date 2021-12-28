export const ActionTypes = {
  SET_DATA: 'SET_DATA',
  SET_LOADING: 'SET_LOADING',
  SET_LOADED: 'SET_LOADED',
};

export const initialState = {
  loading: false,
  loaded: false,
  confirmedCases: [],
  recoveredCases: [],
  deathCases: [],
};

function setDataReducer(state, action) {
  const { confirmedCases, recoveredCases, deathCases } = action.payload;

  return { ...state, confirmedCases, recoveredCases, deathCases };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: true, loaded: false };
    case ActionTypes.SET_LOADED:
      return { ...state, loading: false, loaded: true };
    case ActionTypes.SET_DATA:
      return setDataReducer(state, action);
    default:
      return state;
  }
}
