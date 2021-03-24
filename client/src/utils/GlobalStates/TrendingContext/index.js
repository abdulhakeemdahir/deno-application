import React, { createContext, useReducer, useContext } from "react";
import reducer from "./trendingReducer.js";

const TrendingContext = createContext();
const { Provider } = TrendingContext;

const TrendingProvider = ({ value = [], ...props }) => {
  const [trendingState, trendingDispatch] = useReducer(reducer, {
    hashtag: [],
    posts: [],
    causes: [],
    comments: []
  });

  return <Provider value={[trendingState, trendingDispatch]} {...props} />;
};

const useTrendingContext = () => {
  return useContext(TrendingContext);
};

export { TrendingProvider, useTrendingContext };
