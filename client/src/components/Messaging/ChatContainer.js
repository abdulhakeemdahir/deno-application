import {
  Button,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { height } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

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

export default function ChatContainer() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.chatContainer}></Grid>
      <Grid className={classes.textContainer} item>
        <FormGroup>
          <form id='chat-form'>
            <TextField
              name='chatform'
              variant='outlined'
              label='Chat'
              placeholder='Enter Message'
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
