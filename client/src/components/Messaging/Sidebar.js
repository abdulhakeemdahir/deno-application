import { Divider, Grid, List, ListItem, Typography } from "@material-ui/core";

export default function Sidebar({ convos }) {
  return (
    <Grid container class='chat-sidebar'>
      <Grid item>
        <List>
          {convos?.length > 0 ? (
            convos.map(convo => {
              return (
                <ListItem>
                  <Typography>{convo.participants}</Typography>
                  <Typography>{convo.message}</Typography>
                </ListItem>
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
