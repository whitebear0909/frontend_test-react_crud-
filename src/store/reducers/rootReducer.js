const initialState = {
  quotes: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUOTES":
      return { ...state, quotes: action.data };
    case "CREATE_QUOTE":
      return { ...state, quotes: [...state.quotes, action.data] };
    default:
      return state;
  }
};

export default rootReducer;
