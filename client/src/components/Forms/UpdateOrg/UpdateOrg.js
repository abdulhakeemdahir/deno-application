import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../../utils/api.js";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { UPDATE_USER, USER_LOADING } from "../../../utils/actions/actions.js";
import updateFormStyles from "../useStyles/formStyles";

const UpdateOrg = props => {
  const [userState, userDispatch] = useUserContext();
  const [stateSignUp, setStateSignUp] = useState({
    firstName: "",
    lastname: "",
    phoneNumber: "",
    website: "",
    address: "",
    profileImg: "",
    bio: "",
    email: "",
    password: "",
    username: "",
    orgName: ""
  });

  const handleChange = function(event) {
    const { name, value } = event.target;
    setStateSignUp({
      ...stateSignUp,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const updateUser = { role: userState.role };
    if (stateSignUp.orgName !== "") {
      updateUser.orgName = stateSignUp.orgName;
    }
    if (stateSignUp.firstName !== "") {
      updateUser.firstName = stateSignUp.firstName;
    }
    if (stateSignUp.lastname !== "") {
      updateUser.lastname = stateSignUp.lastname;
    }
    if (stateSignUp.phoneNumber !== "") {
      updateUser.phoneNumber = stateSignUp.phoneNumber;
    }
    if (stateSignUp.website !== "") {
      updateUser.website = stateSignUp.website;
    }
    if (stateSignUp.address !== "") {
      updateUser.address = stateSignUp.address;
    }
    if (previewSource) {
      updateUser.profileImg = previewSource;
    }
    if (stateSignUp.bio !== "") {
      updateUser.bio = stateSignUp.bio;
    }
    if (stateSignUp.email !== "") {
      updateUser.email = stateSignUp.email;
    }
    if (stateSignUp.password !== "") {
      updateUser.password = stateSignUp.password;
    }
    if (stateSignUp.username !== "") {
      updateUser.username = stateSignUp.username;
    }
    if (stateSignUp.orgName !== "") {
      updateUser.orgName = stateSignUp.orgName;
    }

    updateOrg(updateUser);

    const userInfo = await api.getUser(userState._id);

    await userDispatch({ type: USER_LOADING });

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
  const updateOrg = async update => {
    console.log(update);
    const updateUser = await api.updateUser(userState._id, update);
    console.log(updateUser);
  };

  const classes = updateFormStyles();

  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

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
          Update Organization
        </Typography>
      </Grid>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          value={stateSignUp.firstName}
          onChange={handleChange}
          variant="outlined"
          label="Firstname"
          placeholder="Enter First Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="lastname"
          value={stateSignUp.lastname}
          onChange={handleChange}
          variant="outlined"
          label="Lastname"
          placeholder="Enter Last Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="orgName"
          value={stateSignUp.orgName}
          onChange={handleChange}
          variant="outlined"
          label="orgName"
          placeholder="Enter Organization Name"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="bio"
          value={stateSignUp.bio}
          onChange={handleChange}
          variant="outlined"
          label="Bio"
          placeholder="Enter Bio"
          fullWidth
          type="bio"
          className={classes.mgstyle}
        />
        <TextField
          name="phoneNumber"
          value={stateSignUp.phoneNumber}
          onChange={handleChange}
          variant="outlined"
          label="phoneNumber"
          placeholder="Enter Phone"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="website"
          value={stateSignUp.website}
          onChange={handleChange}
          variant="outlined"
          label="Website"
          placeholder="Enter Website"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
          name="address"
          value={stateSignUp.address}
          onChange={handleChange}
          variant="outlined"
          label="Address"
          placeholder="Enter Address"
          fullWidth
          className={classes.mgstyle}
        />
        <TextField //*Associated with cloudinary
          type="file"
          name="imageUrl"
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
          onClick={handleSubmit}
        >
          Update
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ width: "75%" }} />
      )}
    </Grid>
  );
};

export default UpdateOrg;
