//set states as arrays that I can push into
import React, { createContext, useReducer, useContext } from "react";
import reducer from "./newsReducer";

const NewsContext = createContext();
const { Provider } = NewsContext;

const NewsProvider = ({ value = [], ...props }) => {
  const [newsState, newsDispatch] = useReducer(reducer, {
    _id: 0,
  });

  return <Provider value={[newsState, newsDispatch]} {...props} />;
};

const useNewsContext = () => {
  return useContext(NewsContext);
};

export { NewsProvider, useNewsContext };