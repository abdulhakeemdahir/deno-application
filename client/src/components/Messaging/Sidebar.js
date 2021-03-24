import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography
} from "@material-ui/core";

export default function Sidebar({ convos, toggleChat }) {
  return (
    <Grid container class='chat-sidebar'>
      <Grid item>
        <List>
          {convos?.length > 0 ? (
            convos.map(convo => {
              return (
                <button onClick={() => toggleChat(convo.name)}>
                  <List>
                    <ListItem>{convo.participants.join(", ")}</ListItem>
                    <ListItem>{convo.message}</ListItem>
                  </List>
                </button>
              );
            })
          ) : (
            <Typography>You're DM's are empty 😢</Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
}
