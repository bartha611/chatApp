const createAsyncReducer = base => {
  const defaultState = {
    loading: false,
    [base]: [],
    error: null
  };
  const entity = base.toUpperCase().replace(/S$/, "");
  return (state = defaultState, action) => {
    switch (action.type) {
      case `${entity}_REQUEST`:
        return {
          ...state,
          loading: true
        };
      case `${entity}_CREATE`:
        return {
          ...state,
          [base]: [...state[base], action.payload],
          loading: false,
          error: null
        };
      case `${entity}_READ`:
        return {
          ...state,
          [base]: action.payload,
          loading: false,
          error: null
        };
      case `${entity}_DELETE`:
        return {
          ...state,
          [base]: state[base].filter(x => x.id !== action.payload),
          loading: false,
          error: null
        };
      case `${entity}_FAILURE`:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
};

export const messageReducer = createAsyncReducer("messages");
export const channelReducer = createAsyncReducer("channels");
export const teamReducer = createAsyncReducer("teams");
export const memberReducer = createAsyncReducer("members");
