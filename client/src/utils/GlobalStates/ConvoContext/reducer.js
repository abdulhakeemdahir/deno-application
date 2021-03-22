import {
  GET_USERNAME,
  GET_MESSAGES,
  GET_CONVOS,
  GET_ALL_USERS,
  LOADING
} from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_USERNAME:
      return {
        ...state,
        ...payload
      };

    case GET_MESSAGES:
      return {
        ...state,
        ...payload
      };

    case GET_CONVOS:
      return {
        ...state,
        ...payload
      };

    case GET_ALL_USERS:
      return {
        ...state,
        ...payload
      };

    case LOADING:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};

export default reducer;
