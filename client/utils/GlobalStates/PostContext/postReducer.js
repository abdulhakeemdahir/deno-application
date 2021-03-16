import {
  GET_POST_INFO,
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  POST_LOADING,
  POST_LOADED
} from "../../actions/actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {

  case GET_POST_INFO:
    return {
      ...state,
      ...payload }

  default:
    return state
  }
}