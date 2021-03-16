import React, { createContext, useReducer, useContext } from "react";
import reducer from "./causeReducer";

const CauseContext = createContext();
const { Provider } = CauseContext;

const CauseProvider = ({ value = [], ...props }) => {
  const [causeState, causeDispatch] = useReducer(reducer, {
    _id: 0,
  });

  return <Provider value={[causeState, causeDispatch]} {...props} />;
};

const useCauseContext = () => {
  return useContext(CauseContext);
};

export { CauseProvider, useCauseContext };