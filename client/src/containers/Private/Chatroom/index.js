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

import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";

import Nav from "../../../components/Navigation";

import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/Messaging/Sidebar";
import ChatContainer from "../../../components/Messaging/ChatContainer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import { useSocket } from "../../../utils/GlobalStates/SocketProvider";
import api from "../../../utils/api";
import { useStoreContext } from "../../../utils/GlobalStates/AuthStore";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const Chatroom = () => {
  const socket = useSocket();
  const [value, setValue] = useState(0);
  const [convos, setConvos] = useState([]);
  const [currentConvo, setCurrentConvo] = useState({});
  const [chat, setChat] = useState({});
  const [userState] = useUserContext();
  const [loading, setLoading] = useState(false);
  const userId = userState._id;

  useEffect(() => {
    if (!socket) return;
    if (convos.length) return;

    setLoading(true);
    socket.emit("chatroom", userId);
    socket.on("get-convos", conversations => {
      setConvos([...conversations]);

      setChat([{ ...conversations[conversations.length - 1] }], () => {
        setLoading(false);
      });
    });
  }, []);

  // const addMessageToConvo = useCallback(
  //   message => {
  //     console.log(message);
  //     setChat(prevChat => {
  //       let madeChange = false;
  //       const newChat = prevChat.map(update => {
  //         madeChange = true;
  //         return {
  //           ...update,
  //           messages: [...update.messages, message]
  //         };
  //       });

  //       console.log(newChat);

  //       if (madeChange) return newChat;

  //       return [...prevChat];
  //     });
  //   },
  //   [setChat]
  // );

  // NEXT STEP IS TO GET THE MESSAGES UPDATED IN REALTIME!

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleChat = roomName => {
    socket.emit("join:room", roomName);
    socket.on("get-convo", conversation => {
      setChat([conversation]);
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

    socket.on("update-chat", async conversation => {
      setChat([conversation]);
      console.log(chat);
    });

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
                    convos={convos}
                    createConvo={createConvo}
                  />
                </Grid>
                <Grid item xs={12} sm={9} className='card-container'>
                  <Typography variant='subtitle2'>Messenger</Typography>
                  <ChatContainer
                    chat={chat}
                    currentConvo={currentConvo}
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
                    convos={convos}
                    createConvo={createConvo}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  <ChatContainer
                    chat={chat}
                    currentConvo={currentConvo}
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
