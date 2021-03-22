import React, { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";

const ConvoContext = createContext();
const { Provider } = ConvoContext;

const ConvoProvider = ({ value = [], ...props }) => {
  const [convos, convoDispatch] = useReducer(reducer, {
    username: "",
    connected: false,
    currentChat: {
      isPost: false,
      postId: "",
      receiverId: ""
    },
    connectedRooms: [],
    allUsers: [],
    conversations: {},
    message: ""
  });

  return <Provider value={[convos, convoDispatch]} {...props} />;
};

const useConvoContext = () => {
  return useContext(ConvoContext);
};

const useConvoDispatch = () => {
  const [, convoDispatch] = useConvoContext();

  return convoDispatch;
};

export { ConvoProvider, useConvoContext, useConvoDispatch };
