import {
  GET_USER_INFO,
  ADD_USER,
  REMOVE_USER,
  USER_MESSAGE,
  UPDATE_USER,
  USER_LOADING,
  USER_LOADED
} from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  
  switch (type) {
    
    case GET_USER_INFO:
      return {
        ...state,
        ...payload
      }

    case ADD_USER:
      return {
        ...state,
        ...payload
      }
      
    case REMOVE_USER:
      return {
        ...state,
        ...payload
      }

    case USER_MESSAGE:
      return {
        ...state,
        ...payload
      }

    case UPDATE_USER:
      return {
        ...state,
        ...payload
      }

    case USER_LOADING:
      return {
        ...state,
        ...payload
      }

    case USER_LOADED:
      return {
        ...state,
        ...payload
      }

    default:
      return state;
  }
};

export default reducer;
