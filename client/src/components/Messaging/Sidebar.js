// Import all relevant packages and components
import { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import api from "../../utils/api";
import sidebarStyles from "./styles/sidebarStyles";
// Create the component function and export for use
const Sidebar = ({ convos, toggleChat, createConvo }) => {
  // Call the styles function
  const classes = sidebarStyles();
  // Create the set and setState from useState
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.getAllUsers().then(res => {
      setUsers([...res.data]);
    });
  }, []);
  // Create the JSX for the component
  return (
    <aside className={classes.chatSidebar}>
      <Autocomplete
        fullWidth
        id='create-message'
        options={users ? users : ""}
        getOptionLabel={option => option.username}
        className={classes.autoComplete}
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
          if (!value) return;

          const payload = {
            username: value.username,
            _id: value._id
          };

          createConvo(payload);
        }}
      />
      <List className={classes.fullConvoList}>
        <div className='convoStart'></div>
        {convos?.length ? (
          convos.map(convo => {
            return (
              <Button
                onClick={() => toggleChat(convo.name)}
                style={{
                  borderBottom: "solid 1px grey"
                }}
                fullWidth
              >
                <List
                  className={classes.convoLists}
                  style={{
                    width: "100%"
                  }}
                >
                  <ListItem className={classes.convoItems}>
                    {convo?.participants[0]?.username},{" "}
                    {convo?.participants[1]?.username}
                  </ListItem>
                  <ListItem className={classes.convoItems}>
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
    </aside>
  );
};

export default Sidebar;
