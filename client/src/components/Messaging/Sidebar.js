import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import api from "../../utils/api";

export default function Sidebar({ convos, toggleChat, createConvo }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getAllUsers().then(res => {
      setUsers([...res.data]);
    });
  }, []);

  return (
    <Grid container class='chat-sidebar'>
      <Autocomplete
        id='combo-box-demo'
        options={users}
        getOptionLabel={option => option.username}
        style={{ marginTop: "1em" }}
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
          {convos?.length > 0 ? (
            convos.map(convo => {
              console.log(convo);
              return (
                <Button
                  onClick={() => toggleChat(convo.name)}
                  style={{ borderBottom: "solid 1px grey" }}
                  fullWidth
                >
                  <List>
                    <ListItem>
                      {convo.participants[0].username},{" "}
                      {convo.participants[1].username}
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
}
