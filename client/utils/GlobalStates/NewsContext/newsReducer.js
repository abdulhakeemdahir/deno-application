import {
  GET_NEWS_INFO,
  ADD_NEWS,
  REMOVE_NEWS,
  UPDATE_NEWS,
  NEWS_LOADING,
  NEWS_LOADED
} from "../../actions/actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {

  case GET_NEWS_INFO:
    return {
      ...state,
      ...payload }

  default:
    return state
  }
}