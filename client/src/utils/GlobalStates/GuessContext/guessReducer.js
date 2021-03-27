import {
 GET_GUESS_USER_INFO,
 ADD_GUESS_USER,
 REMOVE_GUESS_USER,
 USER_GUESS_LOADING,
} from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_GUESS_USER_INFO:
      return {
        ...state,
        ...payload,
      };

    case ADD_GUESS_USER:
      return {
        ...state,
        ...payload,
      };

    case REMOVE_GUESS_USER:
      return {
        ...state,
        ...payload,
      };

    case USER_GUESS_LOADING:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default reducer;
