import React, { createContext, useReducer, useContext } from "react";
import reducer from "./postReducer";

const PostContext = createContext();
const { Provider } = PostContext;

const PostProvider = ({ value = [], ...props }) => {
  const [postState, postDispatch] = useReducer(reducer, {
    _id: 0,
  });

  return <Provider value={[postState, postDispatch]} {...props} />;
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };