import React, { createContext, useContext, useState } from "react";

const ConvoContext = createContext();
const { Provider } = ConvoContext;

const ConvoProvider = ({ children }) => {
  const [convos, setConvos] = useState({
    converstaions: [
      {
        users: [],
        messages: []
      }
    ]
  });

  const newConvo = (id, username) => {
    setConvos(prevConvos => {
      return [...prevConvos, { id, username }];
    });
  };

  return <Provider value={[convos, newConvo]} />;
};

const useConvoContext = () => {
  return useContext(ConvoContext);
};

export { ConvoProvider, useConvoContext };
