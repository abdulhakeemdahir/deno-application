import React, { createContext, useReducer, useContext } from "react";
import reducer from "./trendReducer";

const TrendContext = createContext();
const { Provider } = TrendContext;

const TrendProvider = ({ value = [], ...props }) => {
  const [trendState, trendDispatch] = useReducer(reducer, {
    _id: 0,
  });

  return <Provider value={[trendState, trendDispatch]} {...props} />;
};

const useTrendContext = () => {
  return useContext(TrendContext);
};

export { TrendProvider, useTrendContext };
