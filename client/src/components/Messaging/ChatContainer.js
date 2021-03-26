import { useState, useRef, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import { useSocket } from "../../utils/GlobalStates/SocketProvider";

const useStyles = makeStyles(theme => ({
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px"
  },
  chatContainer: {
    position: "relative",
    height: "60vh",
    overflowY: "scroll",
    clear: "both"
    // boxShadow: "0px 1px 1px #de1dde"
  },
  textContainer: {
    // position: "absolute"
  }
}));

const ChatContainer = ({ chat, sendMessage, userId }) => {
  const classes = useStyles();

  const [content, setContent] = useState("");

  const textRef = useRef();

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
  };

  const handleInput = e => {
    setContent(e.target.value);
  };

  return (
    <>
      <Grid container className={classes.chatContainer}>
        <List>
          {chat?.messages?.length ? (
            chat.messages?.map(message => {
              return (
                <ListItem>
                  <List>
                    <ListItem>
                      <Typography>{message.content}</Typography>
                    </ListItem>
                    <ListItem>{message.sender?.username}</ListItem>
                  </List>
                </ListItem>
              );
            })
          ) : (
            <Typography>Say Hello! 👋</Typography>
          )}
        </List>
      </Grid>
      <Grid className={classes.textContainer} item>
        <FormGroup>
          <FormControl id='chat-form'>
            <TextField
              name='chatform'
              variant='outlined'
              label='Chat'
              placeholder='Enter Message'
              ref={textRef}
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
