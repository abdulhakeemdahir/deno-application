import React, { useState, useRef, useEffect, useCallback } from "react";

import {
  Typography,
  Grid,
  CssBaseline,
  Button,
  Modal,
  TextField
} from "@material-ui/core";
import "./style.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PropTypes from "prop-types";

import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/Messaging/Sidebar";
import ChatContainer from "../../../components/Messaging/ChatContainer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { useSocket } from "../../../utils/GlobalStates/SocketProvider";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { useConvoContext } from "../../../utils/GlobalStates/ConvoContext";
import {
  GET_A_CONVO,
  GET_CONVOS,
  LOADING,
  UPDATE_CHAT
} from "../../../utils/GlobalStates/ConvoContext/action";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const Chatroom = () => {
  const [conversations, convoDispatch] = useConvoContext();
  const socket = useSocket();
  const [value, setValue] = useState(0);
  const [userState] = useUserContext();
  const userId = userState._id;

  useEffect(() => {
    if (!socket) return;

    socket.emit("chatroom", userId);
    socket.on("get-convos", async data => {
      await convoDispatch({ type: LOADING });

      await convoDispatch({
        type: GET_CONVOS,
        payload: { conversations: [...data] }
      });

      await convoDispatch({
        type: GET_A_CONVO,
        payload: { chat: { ...data[0], loading: false } }
      });

      socket.emit("join:room", conversations.chat.name);
    });

    return () => socket.off("get-convos");
  }, []);

  const scrollToBottom = () =>
    document
      .querySelector(".messagesEnd")
      .scrollIntoView({ behavior: "smooth" });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleChat = roomName => {
    if (conversations.chat.name === roomName) return;

    socket.emit("join:room", roomName);
    socket.on("get-convo", async conversation => {
      await convoDispatch({
        type: GET_A_CONVO,
        payload: { chat: conversation }
      });
    });
  };

  const sendMessage = payload => socket.emit("send-message", payload);

  const createConvo = ({ username, _id }) => {
    const payload = {
      name: `${userState.username}:${username}`,
      participants: [userId, _id]
    };

    socket.emit("create:room", payload);
  };

  useEffect(() => {
    if (!socket) return;

    const updateSidebar = async newConvo => {
      await convoDispatch({ type: LOADING });

      await convoDispatch({
        type: GET_CONVOS,
        payload: {
          conversations: [newConvo, ...conversations.conversations],
          loading: false
        }
      });
    };

    socket.on("get-newConvo", updateSidebar);

    scrollToBottom();

    return () => socket.off("get-newConvo");
  });

  useEffect(() => {
    if (!socket) return;

    const updateChat = async ({ newMessage, newConvo }) => {
      console.log(newMessage);
      await convoDispatch({
        type: UPDATE_CHAT,
        payload: {
          chat: {
            ...newConvo,
            messages: [...newConvo.messages, newMessage]
          }
        }
      });
    };

    socket.on("update-chat", updateChat);

    scrollToBottom();

    return () => socket.off("update-chat");
  }, []);

  const { width } = useWindowDimensions();
  return (
    <div className='Main'>
      <CssBaseline>
        <Nav />

        <Grid
          container
          direction='row'
          justify='center'
          className={"container"}
          xs={12}
          lg={10}
          xl={8}
        >
          {width > 600 ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>Conversations</Typography>
                  <Sidebar
                    toggleChat={toggleChat}
                    convos={conversations.conversations}
                    createConvo={createConvo}
                  />
                </Grid>
                <Grid item xs={12} sm={9} className='card-container'>
                  <Typography variant='subtitle2'>Messenger</Typography>
                  <ChatContainer
                    chat={conversations.chat}
                    sendMessage={sendMessage}
                    userId={userId}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='simple tabs example'
              >
                <Tab label='Convos' {...a11yProps(0)} />
                <Tab label='Messenger' {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  <Sidebar
                    toggleChat={toggleChat}
                    convos={conversations.conversations}
                    createConvo={createConvo}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  <ChatContainer
                    chat={conversations.chat}
                    sendMessage={sendMessage}
                    userId={userId}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}></Grid>
              </TabPanel>
            </>
          )}
        </Grid>
        <Gradient />
        {/* <Splash /> */}
        <Footer />
      </CssBaseline>
    </div>
  );
};

export default Chatroom;
