const initialState = {
    user: null,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  }
  