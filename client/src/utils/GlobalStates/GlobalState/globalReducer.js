import { ADD, REMOVE, UPDATE, LOADING } from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case REMOVE:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case UPDATE:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default reducer;
