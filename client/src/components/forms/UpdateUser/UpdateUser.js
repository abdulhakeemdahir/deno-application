// Import all relevant packages and components
import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../../utils/api.js";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { UPDATE_USER, USER_LOADING } from "../../../utils/actions/actions.js";
import updateFormStyles from "../useStyles/formStyles";

// Create the component function and export for use
const UpdateUser = props => {
  // Destructure State and Dispatch from Context
  const [userState, userDispatch] = useUserContext();
  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({
    firstName: "",
    lastname: "",
    bio: ""
  });
  // Create the handleChange function
  const handleChange = function(event) {
    const { name, value } = event.target;
    setStateUpdate({
      ...stateUpdate,
      [name]: value
    });
  };
  // Create the handleSubmit function
  const handleSubmit = async event => {
    event.preventDefault();
    const updateUser = {};

    if (stateUpdate.firstName !== "") {
      updateUser.firstName = stateUpdate.firstName;
    }
    if (stateUpdate.lastname !== "") {
      updateUser.lastname = stateUpdate.lastname;
    }
    if (stateUpdate.bio !== "") {
      updateUser.bio = stateUpdate.bio;
    }
    //*Associated with cloudinary
    if (previewSource) {
      updateUser.profileImg = previewSource;
    }
    await upDateUser(updateUser);

    const userInfo = await api.getUser(userState._id);

    await userDispatch({
      type: USER_LOADING
    });

    await userDispatch({
      type: UPDATE_USER,
      payload: {
        ...userInfo.data,
        loading: false
      }
    });

    props.onClose();
  };

  //*Associated with cloudinary
  const upDateUser = async update => {
    const updateUser = await api.updateUser(userState._id, update);
    console.log(updateUser);
  };
  // Call the styles function
  const classes = updateFormStyles();
  // Create the handleFileInputChange function
  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Grid
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
        <Typography variation="h6" color="default">
          Update User
        </Typography>
      </Grid>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          value={stateUpdate.firstName}
          onChange={handleChange}
          variant="outlined"
          label="Firstname" //*Spelling?
          placeholder="Enter First Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="lastname"
          value={stateUpdate.lastname}
          onChange={handleChange}
          variant="outlined"
          label="Lastname"
          placeholder="Enter Last Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="bio"
          value={stateUpdate.bio}
          onChange={handleChange}
          variant="outlined"
          label="Bio"
          placeholder="Enter Bio"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField //*Associated with cloudinary
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          variant="outlined"
          fullWidth
          className={classes.mgstyle}
        />
        <Button
          type="submit"
          size="large"
          className={classes.styleMain}
          fullWidth
        >
          Update
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" className={classes.imgStyle} />
      )}
    </Grid>
  );
};

export default UpdateUser;
