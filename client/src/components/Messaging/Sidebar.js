import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import api from "../../utils/api";

const useStyles = makeStyles(theme => ({
  sidebar: {
    position: "relative",
    height: "60vh",
    overflowY: "scroll",
    clear: "both"
    // boxShadow: "0px 1px 1px #de1dde"
  }
}));

const Sidebar = ({ convos, toggleChat, createConvo }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getAllUsers().then(res => {
      setUsers([...res.data]);
    });
  }, []);

  return (
    <Grid container className={`chat-sidebar ${classes.sidebar}`}>
      <Autocomplete
        fullWidth
        id='create-message'
        options={users ? users : ""}
        getOptionLabel={option => option.username}
        style={{ marginTop: "1em", textAlign: "left" }}
        renderInput={params => (
          <TextField
            {...params}
            label='Start new convo...'
            variant='outlined'
          />
        )}
        renderOption={option => {
          return (
            <div key={option._id}>
              <Typography value={option.username}>{option.username}</Typography>
            </div>
          );
        }}
        onChange={(event, value) => {
          const payload = {
            username: value.username,
            _id: value._id
          };

          createConvo(payload);
        }}
      />
      <Grid item>
        <List>
          {convos?.length ? (
            convos.map(convo => {
              return (
                <Button
                  onClick={() => toggleChat(convo.name)}
                  style={{ borderBottom: "solid 1px grey" }}
                  fullWidth
                >
                  <List>
                    <ListItem>
                      {convo?.participants[0]?.username},{" "}
                      {convo?.participants[1]?.username}
                    </ListItem>
                    <ListItem>
                      {convo.messages?.length ? (
                        convo.messages[convo.messages?.length - 1].content
                      ) : (
                        <div>Start convo...</div>
                      )}
                    </ListItem>
                  </List>
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
};

export default Sidebar;
