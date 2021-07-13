import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const ConvoContext = createContext();
const { Provider } = ConvoContext;

const ConvoProvider = ({ value = [], ...props }) => {
  // const socket = useSocket();
  const [conversations, convoDispatch] = useReducer(reducer, {
    conversations: [],
    chat: {},
    loading: false
  });

  return <Provider value={[conversations, convoDispatch]} {...props} />;
};

const useConvoContext = () => {
  return useContext(ConvoContext);
};

export { ConvoProvider, useConvoContext };
