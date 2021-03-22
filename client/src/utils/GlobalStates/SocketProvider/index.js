import { useEffect } from "react";
import io from "socket.io-client";
import api from "../../api";
import { useStoreDispatch } from "../AuthStore";
import { SET_SOCKET } from "../AuthStore/actions";
import immer from "immer";

export const useSocketConnection = () => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    console.log(localStorage.getItem("jwtToken"));
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
