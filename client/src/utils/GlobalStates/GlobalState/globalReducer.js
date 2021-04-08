import {
  ADD,
  REMOVE,
  UPDATE,
  LOADING,
} from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD:
      return {
        ...state,
        ...payload,
      };

    case REMOVE:
      return {
        ...state,
        ...payload,
      };

    case UPDATE:
      return {
        ...state,
        ...payload,
      };

    case LOADING:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default reducer;
