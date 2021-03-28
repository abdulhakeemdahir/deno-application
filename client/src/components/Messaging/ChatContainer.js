import { useState, useRef } from "react";
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
import { useUserContext } from "../../utils/GlobalStates/UserContext";

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
  p: {
    maxWidth: 255,
    wordWrap: "break-word",
    marginBottom: 12,
    lineHeight: 24,
    position: "relative",
    padding: "10px 20px",
    borderRadius: 25,

    "&:before": {
      content: '"',
      position: "absolute",
      bottom: 0,
      height: 25
    },
    "&:after": {
      content: '"',
      position: "absolute",
      bottom: 0,
      height: 25
    }
  },

  fromMe: {
    color: "white",
    background: "#0B93F6",
    alignSelf: "flex-end",

    "&:before": {
      right: "-7px",
      width: 20,
      backgroundColor: "#0B93F6",
      borderBottomLeftRadius: "16px 14px"
    },

    "&:after": {
      right: "-26px",
      width: 26,
      backgroundColor: "white",
      borderBottomLeftRadius: 10
    }
  },

  fromThem: {
    background: "#E5E5EA",
    color: "black",
    alignSelf: "flex-start",

    "&:before": {
      left: "-7px",
      width: 20,
      backgroundColor: "#E5E5EA",
      borderBottomRightRadius: 16
    },

    "&:after": {
      left: "-26px",
      width: 26,
      backgroundColor: "white",
      borderBottomRightRadius: 10
    }
  }
}));

const ChatContainer = ({ chat, sendMessage, userId }) => {
  const classes = useStyles();

  const [content, setContent] = useState("");

  const [userState] = useUserContext();

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

    setContent("");
  };

  const handleInput = e => {
    setContent(e.target.value);
    console.log(content);
  };

  return (
    <>
      <Grid container className={classes.chatContainer}>
        <List>
          {chat?.messages?.length ? (
            chat.messages?.map(message => {
              let messageDeco =
                message.sender.username !== userState.username
                  ? classes.fromThem
                  : classes.fromMe;

              return (
                <ListItem>
                  <List>
                    <ListItem>
                      <p className={messageDeco}>{message.content}</p>
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
