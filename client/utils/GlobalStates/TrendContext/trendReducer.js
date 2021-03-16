import {
  GET_TREND_INFO,
  ADD_TREND,
  REMOVE_TREND,
  UPDATE_TREND,
  TREND_LOADING,
  TREND_LOADED,
} from "../../actions/actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {

  case GET_TREND_INFO:
    return {
      ...state,
      ...payload }

  default:
    return state
  }
}