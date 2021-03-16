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
      };

    default:
      return state;
  }
};

export default reducer;
