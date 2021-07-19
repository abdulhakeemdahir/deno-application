// Import all relevant packages and components
import { useState } from "react";
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
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";
// Create the component function and export for use
const ChatContainer = ({ chat, sendMessage, userId }) => {
  // Call the styles function
  const classes = chatStyles();
  // Create the set and setState from useState
  const [content, setContent] = useState("");
  // Destructure State and Dispatch from Context
  const [globalState] = useGlobalContext();
  // Create the sendMessageToServer function
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
  // Create the handleInput function
  const handleInput = e => {
    setContent(e.target.value);
  };
  // Create the JSX for the component
  return (
    <main>
      <Grid container className={classes.chatContainer}>
        <List className={classes.bubbleContainer}>
          {chat?.messages?.length ? (
            chat.messages?.map(message => {
              let messageDeco =
                message.sender.username === globalState.user.username
                  ? {
                      fromMe: classes.fromMe,
                      bubbleMe: classes.bubbleMe
                    }
                  : {
                      fromThem: classes.fromThem,
                      bubbleThem: classes.bubbleThem
                    };

              return (
                <ListItem className={Object.values(messageDeco)[0]}>
                  <List
                    style={{
                      maxWidth: "40ch"
                    }}
                  >
                    <ListItem className={Object.values(messageDeco)[1]}>
                      <p>{message.content}</p>
                    </ListItem>
                    <ListItem
                      style={{
                        fontSize: ".7rem"
                      }}
                    >
                      {message.sender?.username} - {message.createdAt}
                    </ListItem>
                  </List>
                </ListItem>
              );
            })
          ) : (
            <Typography>Say Hello! 👋</Typography>
          )}
          <div className='messagesEnd'></div>
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
    </main>
  );
};

export default ChatContainer;
