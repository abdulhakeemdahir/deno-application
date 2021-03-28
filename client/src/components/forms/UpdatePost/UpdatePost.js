// import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { useState } from "react";
import api from "../../../utils/api";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
      width: "100%",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  styleMain: {
    background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
    color: "#ffffff",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "0px",
  },
  inputMargin: {
    margin: "5px",
  },
}));
export default function UpdatePost(props) {
  const classes = useStyles();
  const [userState, userDispatch] = useUserContext();
  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({
    title: "",
    content: "",
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
    const updateUser = {};
    if (stateUpdate.title !== "") {
      updateUser.title = stateUpdate.title;
    }
    if (stateUpdate.content !== "") {
      updateUser.content = stateUpdate.content;
    }
    //*Associated with cloudinary
    if (previewSource) {
      updateUser.imageUrl = previewSource;
    }
    await updatePost(updateUser);
    props.onClose();
  };
  //read file that is been uploaded
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  //sets the file to preview state
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  //*update post by sending post id and update object
  const updatePost = async (update) => {
    console.log(update);
    const post = await api.updatePost(props.id, update);
    console.log(post);
  };
  return (
    <Grid className="cardPost">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Grid container>
            <TextField
              id="title"
              label="Edit Title"
              name="title"
              value={stateUpdate.title}
              onChange={handleChange}
              multiline
              rowsMax={4}
              className={classes.inputMargin}
              size="small"
            />
            <TextField
              id="post"
              label="Edit Message"
              name="content"
              value={stateUpdate.content}
              onChange={handleChange}
              variant="filled"
              multiline
              rows={4}
              fullWidth
              size="small"
            />
            <TextField
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              variant="outlined"
            />
          </Grid>
        </div>
        <Button size="small" className={classes.styleMain} onClick={handleSubmit}>
          <ChatBubbleOutlineIcon /> Update
        </Button>
      </form>
      {previewSource && <img src={previewSource} alt="chosen" className={classes.imgStyle} />}
    </Grid>
  );
}
