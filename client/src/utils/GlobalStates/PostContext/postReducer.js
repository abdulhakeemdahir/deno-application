import {
  GET_POST_INFO,
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  POST_LOADING,
  POST_LOADED
} from "../../actions/actions";

const reducer = (state, { type, payload }) => {

  switch (type) {
    case GET_POST_INFO:
      return {
        ...state,
        ...payload
      }

    case ADD_POST:
      return {
        ...state,
        ...payload
      }
      
    case REMOVE_POST:
      return {
        ...state,
        ...payload
      }

    case UPDATE_POST:
      return {
        ...state,
        ...payload
      }

    case POST_LOADING:
      return {
        ...state,
        ...payload
      }

    case POST_LOADED:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};

export default reducer;
