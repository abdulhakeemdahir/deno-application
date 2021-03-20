import React, { createContext, useEffect, useContext, useState } from "react";
import io from "socket.io-client";
import api from "../../api";

const SocketContext = createContext();
const { Provider } = SocketContext;

const SocketProvider = ({ id, ...props }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(`${window.location.origin}`, {
      query: { id }
      // transportOptions: {
      //   polling: {
      //     extraHeaders: {
      //       Authorization: localStorage.getItem("jwtToken")
      //     }
      //   }
      // }
    });
    const socket2 = io(`${window.location.origin}/newsfeed`, {
      query: { id }
    });

    console.log(socket2);

    newSocket.on("connect", () => {
      api.setHeader("User-Socket-Id", newSocket.id);
      setSocket(newSocket);
      console.log(newSocket);
    });

    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });

    return () => {
      newSocket.close();
      api.setHeader("User-Socket-Id", false);
      setSocket(false);
    };
  }, [id]);

  return <Provider value={[socket, setSocket]} {...props} />;
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocketContext };
