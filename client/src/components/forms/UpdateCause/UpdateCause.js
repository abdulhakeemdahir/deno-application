// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./style.css";
// Create a useStyles Material UI component for styling
import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";
import { useState } from "react";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import api from "../../../utils/api";
import useUpdateStyles from "../useStyles/useUpdateStyles";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";

const UpdateCause = props => {
  // Call the styles function
  const classes = useUpdateStyles();

  const [userState, userDispatch] = useUserContext();
  const [globalState, globalDispatch] = useGlobalContext();


  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({
    title: "",
    content: ""
  });
  const handleChange = function(event) {
    const { name, value } = event.target;
    setStateUpdate({
      ...stateUpdate,
      [name]: value
    });
  };
  const handleSubmit = async event => {
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
      updateUser.profileImg = previewSource;
    }

    await updateCause(updateUser);
    props.onClose();
  };
  //read file that is been uploaded
  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
  };
  //sets the file to preview state
  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  //*update post by sending post id and update object
  const updateCause = async update => {
    console.log(update);
    const post = await api.updateCause(props.id, update);
    console.log(post);
  };
  // Create the JSX for the component
  return (
    <Grid className="cardPost">
      <form className={classes.root} noValidate autoComplete="off">
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
              label="Edit Cause"
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
        <Button
          size="small"
          className={classes.styleMain}
          onClick={handleSubmit}
        >
          <ChatBubbleOutlineIcon /> Update
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" className={classes.imgStyle} />
      )}
    </Grid>
  );
};

export default UpdateCause;
