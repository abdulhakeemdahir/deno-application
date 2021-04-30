import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Divider,
  Grid,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useWindowDimensions } from "../../../utils";
import { useUserContext } from "../../../../utils/GlobalStates/UserContext";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState";
import updateFormStyles from "../../../../components/Forms/useStyles/formStyles";
import api from "../../../../utils/api";


const SettingsListComponent = () => {

  const { width } = useWindowDimensions();
  // Create the JSX for the component
  const [userState, userDispatch] = useUserContext();
  const [globalState, globalDispatch] = useGlobalContext();

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
//*Associated with cloudinary
const [fileInputState] = useState("");
const [previewSource, setPreviewSource] = useState("");
const [stateUpdate, setStateUpdate] = useState({
  firstName: "",
  lastname: "",
  bio: "",
});

//*Associated with cloudinary
const upDateUser = async (update) => {
  const updateUser = await api.settingsPage(userState._id, update);
  console.log(updateUser);
};
// Call the styles function
const classes = updateFormStyles();
// Create the handleFileInputChange function
const handleFileInputChange = (e) => {
  const file = e.target.files[0];
  previewFile(file);
};
const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreviewSource(reader.result);
  };
};

const handleClose = () => {
  setOpen(false);
};

const handleOpen = (action) => {
  setOpen(true);
  setAction(action);
};

  return (
    <Grid>
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
    </Grid>
  );
};

export default SettingsListComponent;
