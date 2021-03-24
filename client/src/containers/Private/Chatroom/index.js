import React, { useState, useRef, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  const toggleRef = useRef();

  const socket = useSocket();
  const [value, setValue] = useState(0);
  const [convos, setConvo] = useState([
    {
      name: "pod",
      participants: ["taani", "pod-1"],
      message: "Attack on Titan > everything"
    }
  ]);
  const [chat, setChat] = useState({});
  const [userState] = useUserContext();
  const userId = userState._id;

  useEffect(() => {
    console.log("hello");
    api.getLatestConvo(userId).then(res => {
      console.log(res);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleChat = roomName => {
    socket.emit("join:room", roomName);
    socket.on("get-convo", conversation => {
      const mapped = conversation.messages.map(message => message.content);
      console.log(conversation);
      setChat({
        ...conversation,
        messages: mapped
      });
    });
  };

  const sendMessage = payload => {
    socket.emit("send-message", payload);
    socket.on("update-chat", conversation => {
      setChat({ messages: [...conversation.messages] });
    });
  };

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
                    toggleRef={toggleRef}
                  />
                </Grid>
                <Grid item xs={12} sm={9} className='card-container'>
                  <Typography variant='subtitle2'>Messenger</Typography>
                  <ChatContainer
                    chat={chat}
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
                    toggleRef={toggleRef}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                  <ChatContainer
                    chat={chat}
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
