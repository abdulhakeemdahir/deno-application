import React, { useState } from "react";
import { Typography, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import api from "../../../utils/api.js";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";


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
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
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
}));
export default function UpdateUser() {
  const [userState] = useUserContext();
  const [stateUpdate, setStateUpdate] = useState({
    firstName: "",
    lastname: "",
  });

  const handleChange = function(event) {
    const { name, value } = event.target;
    setStateUpdate({
      ...stateUpdate,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      stateUpdate.firstName === "" ||
      stateUpdate.lastname === ""
    ) {
      return;
    }
    console.log(stateUpdate);
    //*Associated with cloudinary
    if(!previewSource) return;
    uploadImage(previewSource);
    
    try {
      // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
    } catch (err) {
      // Handle error responses from the API. This will include
      if (err.response && err.response.data) console.log(err.response.data);
    }
  };
  
  //*Associated with cloudinary
  const uploadImage = async (base64EncodedImage) => {

    const updateUser = await api.updateUser(userState._id, ({profileImg: base64EncodedImage, ...stateUpdate}))
      console.log(updateUser)
  }
  
  const classes = useStyles();
  
  //*Associated with cloudinary
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  
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
        <img src={previewSource} alt="chosen" style={{ width: "75%" }} />
      )}
    </Grid>
  );
}