import {
  GET_CAUSE_INFO,
  ADD_CAUSE,
  REMOVE_CAUSE,
  UPDATE_CAUSE,
  CAUSE_LOADING,
  CAUSE_LOADED
} from "../../actions/actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {

  case GET_CAUSE_INFO:
    return {
      ...state,
      ...payload }

  default:
    return state
  }
}