import { Divider, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState";
import { useWindowDimensions } from "../../../utils";
import { useUserContext } from "../../../../utils/GlobalStates/UserContext";


const SalComponentData = () => {

  const { width } = useWindowDimensions();
  // Create the JSX for the component
  const [userState, userDispatch] = useUserContext();
  const [globalState, globalDispatch] = useGlobalContext();

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (action) => {
    setOpen(true);
    setAction(action);
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleButton = (index) => {
    setToggleState(index);
  };


  return (

    <List style={{ padding: "0px 0px 0px 10px" }} component="nav">
      
      {/* Username  */}

      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText primary="Username:" />
        <ListItemText primary={`${globalState.user.username}`} />
        <IconButton
          className="editButton"
          onClick={() => handleOpen("username")}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />

      {/* Password  */}

      <ListItem style={{ marginTop: "10px", marginBottom: "10px" }}>
        <ListItemText primary="Password:" />
        <ListItemText primary="**********" />
        <IconButton
          className="editButton"
          onClick={() => handleOpen("password")}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </List>
  );
};

export default SalComponentData;
