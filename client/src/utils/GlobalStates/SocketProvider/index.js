import { useEffect } from "react";
import io from "socket.io-client";
import api from "../../api";
import { useStoreDispatch } from "../AuthStore";
import { SET_SOCKET } from "../AuthStore/actions";

export const useSocketConnection = () => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const newSocket = io(`${window.location.origin}`, {
      transportOption: {
        polling: {
          extraHeaders: {
            Authorization: localStorage.getItem("jwtToken")
          }
        }
      }
    });

    newSocket.on("connect", () => {
      api.setHeader("User-Socket-Id", newSocket.id);
      dispatch({ type: SET_SOCKET, payload: newSocket });
    });

    return () => {
      newSocket.disconnect();
      api.setHeader("User-Socket-Id", false);
      dispatch({ type: SET_SOCKET, payload: false });
    };
  }, [dispatch]);
};
