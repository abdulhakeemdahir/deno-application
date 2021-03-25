import {
  ADD_TREND,
  REMOVE_TREND,
  UPDATE_TREND,
  TREND_LOADING,
  TREND_LOADED,

} from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TREND:
      return {
        ...state,
        ...payload,
      };

    case REMOVE_TREND:
      return {
        ...state,
        ...payload,
      };

    case UPDATE_TREND:
      return {
        ...state,
        ...payload,
      };

    case TREND_LOADING:
      return {
        ...state,
        ...payload,
      };

    case TREND_LOADED:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default reducer;
