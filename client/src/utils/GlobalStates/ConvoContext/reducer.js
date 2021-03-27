import { GET_CONVOS, GET_A_CONVO, UPDATE_CHAT, LOADING } from "./action";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_CONVOS:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case GET_A_CONVO:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case UPDATE_CHAT:
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
