import React, { createContext, useEffect, useContext, useState } from "react";

const SocketContext = createContext();
const { Provider } = SocketContext;

const SocketProvider = ({ id, ...props }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return <Provider value={[socket, setSocket]} {...props} />;
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocketContext };
