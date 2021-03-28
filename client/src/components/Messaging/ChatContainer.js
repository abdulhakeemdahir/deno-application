import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from "@material-ui/core";
import chatStyles from "./styles/chatStyles";
import { useUserContext } from "../../utils/GlobalStates/UserContext";

const ChatContainer = ({ chat, sendMessage, userId }) => {
  const classes = chatStyles();

  const [content, setContent] = useState("");

  const [userState] = useUserContext();

  const sendMessageToServer = () => {
    const filterPart = chat.participants.filter(
      participant => participant !== userId
    );

    const payload = {
      content,
      to: filterPart,
      parentId: chat._id,
      sender: userId,
      isPost: false
    };

    sendMessage(payload);

    setContent("");
  };

  const handleInput = e => {
    setContent(e.target.value);
    console.log(content);
  };

  return (
    <>
      <Grid container className={classes.chatContainer}>
        <List className={classes.bubbleContainer}>
          {chat?.messages?.length ? (
            chat.messages?.map(message => {
              let messageDeco =
                message.sender.username === userState.username
                  ? { fromMe: classes.fromMe, bubbleMe: classes.bubbleMe }
                  : {
                      fromThem: classes.fromThem,
                      bubbleThem: classes.bubbleThem
                    };

              return (
                <ListItem className={Object.values(messageDeco)[0]}>
                  <List style={{ maxWidth: "40ch" }}>
                    <ListItem className={Object.values(messageDeco)[1]}>
                      <p>{message.content}</p>
                    </ListItem>
                    <ListItem>
                      {message.sender?.username} - {message.createdAt}
                    </ListItem>
                  </List>
                </ListItem>
              );
            })
          ) : (
            <Typography>Say Hello! 👋</Typography>
          )}
          <div
            style={{ float: "left", clear: "both" }}
            className='messagesEnd'
          ></div>
        </List>
      </Grid>
      <Grid className={classes.textContainer} item>
        <FormGroup>
          <FormControl id='chat-form'>
            <TextField
              value={content}
              name='chatform'
              variant='outlined'
              label='Chat'
              placeholder='Enter Message'
              onInput={handleInput}
              fullWidth
            />
            <Button
              type='submit'
              size='large'
              className={classes.styleMain}
              onClick={sendMessageToServer}
              fullWidth
            >
              Send Message
            </Button>
          </FormControl>
        </FormGroup>
      </Grid>
    </>
  );
};

export default ChatContainer;
