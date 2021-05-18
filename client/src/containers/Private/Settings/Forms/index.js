// Import all relevant packages and components
import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { useGlobalContext } from "../../../../utils/GlobalStates/GlobalState/index.js";
import { LOADING, UPDATE } from "../../../../utils/actions/actions";
import api from "../../../../utils/api";
import updateFormStyles from "../../../../components/Forms/useStyles/formStyles.js";

// Create the component function and export for use
const SettingsUpdateForm = ({ action, onClose }) => {
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({ [action]: "" });
  // Create the handleChange function
  const handleChange = function(event) {
    const { name, value } = event.target;
    setStateUpdate({
      ...stateUpdate,
      [name]: value,
    });
  };
  // Create the handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateUser = {};

    if (stateUpdate[action] !== "") {
      updateUser[action] = stateUpdate[action];
    }
    //*Associated with cloudinary
    if (previewSource) {
      updateUser.profileImg = previewSource;
    }
    await upDateUser(updateUser);

    const userInfo = await api.getUser(globalState.user._id);


    
    await globalDispatch({
      type: LOADING,
    });
    
    await globalDispatch({
      type: UPDATE,
      payload: {
        user: { ...userInfo.data },
        loading: false,
      },
    });
    
    onClose();
  };

  //*Associated with cloudinary
  const upDateUser = async (update) => {
    await api.updateUser(globalState.user._id, update);
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

  console.log(stateUpdate)

  return (
    <Grid
      style={{ paddingTop: "2px" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.paper}
    >
      <Grid item align="center">
        <Avatar className={classes.styleIcon}>
          <CreateIcon />
        </Avatar>
        <Typography style={{ paddingTop: "10px" }} variation="h6" color="default">
          {`UPDATE ${
            action === "profileImg"
              ? "PROFILE IMAGE"
              : action === "phoneNumber"
              ? "PHONE NUMBER"
              : action === "orgName"
              ? "ORGANIZATION NAME"
              : action.toUpperCase()
          }`}
        </Typography>
      </Grid>
      <form autoComplete="off" onSubmit={handleSubmit}>
        {action !== "profileImg" ? (
          <TextField
            name={action}
            value={action === "bio" ? globalState.user.bio : ""}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            multiline
            className={classes.mgstyle}
          />
        ) : (
          <TextField //*Associated with cloudinary
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            variant="outlined"
            fullWidth
            className={classes.mgstyle}
          />
        )}
        <Button type="submit" size="large" className={classes.styleMain} fullWidth>
          Update
        </Button>
      </form>
      {previewSource && <img src={previewSource} alt="chosen" className={classes.imgStyle} />}
    </Grid>
  );
};

export default SettingsUpdateForm;
