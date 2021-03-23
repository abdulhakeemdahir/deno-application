import { Button, Grid, List, ListItem, Typography } from "@material-ui/core";

export default function Sidebar({ convos, toggleChat }) {
  return (
    <Grid container class='chat-sidebar'>
      <Grid item>
        <List>
          {convos?.length > 0 ? (
            convos.map(convo => {
              return (
                <Button onClick={() => toggleChat(convo.name)}>
                  <ListItem>
                    <Typography>{convo.participants}</Typography>
                    <Typography>{convo.message}</Typography>
                  </ListItem>
                </Button>
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
