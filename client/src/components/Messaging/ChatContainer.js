import { useRef } from "react";
import {
  Button,
  FormGroup,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStoreContext } from "../../utils/GlobalStates/AuthStore";

const useStyles = makeStyles(theme => ({
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px"
  },
  chatContainer: {
    position: "relative",
    height: "60vh"
    // boxShadow: "0px 1px 1px #de1dde"
  },
  textContainer: {
    // position: "absolute"
  }
}));

export default function ChatContainer({ chat, sendMessage }) {
  const classes = useStyles();

  const [state] = useStoreContext();

  const textRef = useRef();

  const userId = state.userAuth.user.id;

  console.log(chat);

  return (
    <>
      <Grid container className={classes.chatContainer}>
        <List>
          {chat.messages?.length ? (
            chat.map(message => {
              return (
                <ListItem>
                  <Typography>{message}</Typography>
                </ListItem>
              );
            })
          ) : (
            <Typography>Say Hello! 👋</Typography>
          )}
        </List>
      </Grid>
      <Grid className={classes.textContainer} item>
        <FormGroup
          onSubmit={() => {
            const payload = {
              content: textRef.current.value,
              to: chat.participants.filter(
                participant => participant.id !== userId
              ),
              parentId: chat._id,
              sender: userId,
              isPost: false
            };
            sendMessage(payload);
          }}
        >
          <form id='chat-form'>
            <TextField
              name='chatform'
              variant='outlined'
              label='Chat'
              placeholder='Enter Message'
              ref={textRef}
              fullWidth
            />
            <Button size='large' className={classes.styleMain} fullWidth>
              Send Message
            </Button>
          </form>
        </FormGroup>
      </Grid>
    </>
  );
}
