import {
  GET_CAUSE_INFO,
  ADD_CAUSE,
  REMOVE_CAUSE,
  UPDATE_CAUSE,
  CAUSE_LOADING,
  CAUSE_LOADED
} from "../../actions/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {

    case GET_CAUSE_INFO:
    return {
      ...state,
      ...payload }

  case ADD_CAUSE:
      return {
        ...state,
        ...payload }
        
  case REMOVE_CAUSE:
      return {
        ...state,
        ...payload }

  case UPDATE_CAUSE:
      return {
        ...state,
        ...payload }

  case CAUSE_LOADING:
      return {
        ...state,
        ...payload }

  case CAUSE_LOADED:
      return {
        ...state,
        ...payload }

  default:
    return state
  }
}
export default reducer;
