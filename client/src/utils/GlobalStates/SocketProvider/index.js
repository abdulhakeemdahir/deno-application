import React, { createContext, useEffect, useContext, useState } from "react";
import io from "socket.io-client";
import api from "../../api";

const SocketContext = createContext();
const { Provider } = SocketContext;

const SocketProvider = ({ id, ...props }) => {
  const [socketState, setSocket] = useState();

  useEffect(() => {
    const socket = io(`${window.location.origin}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: localStorage.getItem("jwtToken")
          }
        }
      }
    });

    socket.on("connect", () => {
      api.setHeader("User-Socket-Id", socket.id);
      setSocket(socket);
      console.log(socket);
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    return () => {
      socket.disconnect();
      api.setHeader("User-Socket-Id", false);
      setSocket(false);
    };
  }, [setSocket]);

  return <Provider value={[socketState, setSocket]} {...props} />;
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocketContext };
