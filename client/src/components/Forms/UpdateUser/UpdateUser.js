import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../../utils/api.js";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { UPDATE_USER, USER_LOADING } from "../../../utils/actions/actions.js";

<<<<<<< HEAD
const useStyles = makeStyles((theme) => ({
  paper: {
    background: "linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
    borderRadius: "0px",
    boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
    padding: "20px",
  },
  mgstyle: {
    marginTop: "5px",
    marginBottom: "5px",
=======
const useStyles = makeStyles(theme => ({
  paper: {
    background:
      "linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
    borderRadius: "0px",
    boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
    padding: "20px"
  },
  mgstyle: {
    marginTop: "5px",
    marginBottom: "5px"
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
<<<<<<< HEAD
    padding: "15px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  styleIcon: {
    background: "#3f4d67",
  },
=======
    padding: "15px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },

  styleIcon: {
    background: "#3f4d67"
  }
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
}));
export default function UpdateUser(props) {
  const [userState, userDispatch] = useUserContext();
  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({
    firstName: "",
<<<<<<< HEAD
    lastname: "",
=======
    lastname: ""
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
  });

  const handleChange = function(event) {
    const { name, value } = event.target;
    setStateUpdate({
      ...stateUpdate,
<<<<<<< HEAD
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateUser = {};

    if (stateUpdate.firstName !== "") {
      updateUser.firstName = stateUpdate.firstName;
    }
    if (stateUpdate.lastname !== "") {
      updateUser.lastname = stateUpdate.lastname;
=======
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const udateUser = {};

    if (stateUpdate.firstName !== "") {
      udateUser.firstName = stateUpdate.firstName;
    }
    if (stateUpdate.lastname !== "") {
      udateUser.lastname = stateUpdate.lastname;
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
    }

    //*Associated with cloudinary
    if (previewSource) {
<<<<<<< HEAD
      updateUser.profileImg = previewSource;
    }
    upDateUser(updateUser);
=======
      udateUser.profileImg = previewSource;
    }
    upDateUser(udateUser);
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c

    const userInfo = await api.getUser(userState._id);

    await userDispatch({ type: USER_LOADING });

    await userDispatch({
      type: UPDATE_USER,
      payload: {
        ...userInfo.data,
<<<<<<< HEAD
        loading: false,
      },
=======
        loading: false
      }
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
    });

    props.onClose();
  };

  //*Associated with cloudinary
<<<<<<< HEAD
  const upDateUser = async (update) => {
=======
  const upDateUser = async update => {
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
    const updateUser = await api.updateUser(userState._id, update);
    console.log(updateUser);
  };

  const classes = useStyles();

<<<<<<< HEAD
  const handleFileInputChange = (e) => {
=======
  const handleFileInputChange = e => {
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
    const file = e.target.files[0];
    previewFile(file);
  };

<<<<<<< HEAD
  const previewFile = (file) => {
=======
  const previewFile = file => {
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Grid
      container
<<<<<<< HEAD
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
=======
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.paper}
    >
      <Grid item align='center'>
        <Avatar className={classes.styleIcon}>
          <CreateIcon />
        </Avatar>
        <Typography variation='h6' color='default'>
          Update User
        </Typography>
      </Grid>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          name='firstName'
          value={stateUpdate.firstName}
          onChange={handleChange}
          variant='outlined'
          label='Firstname' //*Spelling?
          placeholder='Enter First Name'
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
<<<<<<< HEAD
          name="lastname"
          value={stateUpdate.lastname}
          onChange={handleChange}
          variant="outlined"
          label="Lastname"
          placeholder="Enter Last Name"
=======
          name='lastname'
          value={stateUpdate.lastname}
          onChange={handleChange}
          variant='outlined'
          label='Lastname'
          placeholder='Enter Last Name'
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
          fullWidth
          className={classes.mgstyle}
        />
        <TextField
<<<<<<< HEAD
          name="bio"
          value={stateUpdate.bio}
          onChange={handleChange}
          variant="outlined"
          label="Bio"
          placeholder="Enter Bio"
=======
          name='bio'
          value={stateUpdate.bio}
          onChange={handleChange}
          variant='outlined'
          label='Bio'
          placeholder='Enter Bio'
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
          fullWidth
          className={classes.mgstyle}
        />
        <TextField //*Associated with cloudinary
<<<<<<< HEAD
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          variant="outlined"
          fullWidth
          className={classes.mgstyle}
        />
        <Button type="submit" size="large" className={classes.styleMain} fullWidth>
          Update
        </Button>
      </form>
      {previewSource && <img src={previewSource} alt="chosen" style={{ width: "75%" }} />}
=======
          type='file'
          name='image'
          onChange={handleFileInputChange}
          value={fileInputState}
          variant='outlined'
          fullWidth
          className={classes.mgstyle}
        />
        <Button
          type='submit'
          size='large'
          className={classes.styleMain}
          fullWidth
        >
          Update
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt='chosen' style={{ width: "75%" }} />
      )}
>>>>>>> b5c69a7fb7f8a4611d62df9d09363cd79258e49c
    </Grid>
  );
}
