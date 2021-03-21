import React, { createContext, useContext, useReducer } from "react";

import { LOGIN_USER, LOGOUT_USER, SET_SOCKET } from "./actions";

const StoreContext = createContext({
  socket: null,
  userAuth: {}
});

const { Provider } = StoreContext;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_SOCKET:
      console.log(payload);
      return { ...state, socket: payload };

    case LOGIN_USER:
      return { ...state, userAuth: payload };

    case LOGOUT_USER:
      return { ...state, userAuth: {} };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {
    socket: null,
    userAuth: {}
  });

  return <Provider value={[store, dispatch]}>{children}</Provider>;
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export const useStoreDispatch = () => {
  const [, dispatch] = useStoreContext();

  return dispatch;
};
