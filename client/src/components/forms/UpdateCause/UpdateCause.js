// Import all relevant packages and components
import { Grid, Button, TextField, Typography, Avatar } from "@material-ui/core";
import "./style.css";
// Create a useStyles Material UI component for styling
import { useState } from "react";
import api from "../../../utils/api";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { LOADING, UPDATE } from "../../../utils/actions/actions";
import updateFormStyles from "../useStyles/formStyles";
import useUpdateStyles from "../useStyles/useUpdateStyles";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";


const UpdateCause = (props) => {
  // Call the styles function

  const [globalState, globalDispatch] = useGlobalContext();

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
    const updateCause = {};

    if (stateUpdate.title !== "") {
      updateCause.title = stateUpdate.title;
    }
    if (stateUpdate.content !== "") {
      updateCause.content = stateUpdate.content;
    }
    //*Associated with cloudinary
    if (previewSource) {
      updateCause.imageUrl = previewSource;
    }
    await updateCause(updateCause);
    props.onClose();
    const causeInfo = await api.getUsersCauses(globalState.user._id);

    await globalDispatch({
      type: LOADING,
    });

    await globalDispatch({
      type: UPDATE,
      payload: {
        cause: { ...causeInfo.data },
        loading: false,
      },
    });
  };
  //*update post by sending post id and update object
  const updateCause = async update => {
   console.log(update);
   const post = await api.updateCause(props.id, update);
   console.log(post);
 };
  //*Associated with cloudinary
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

  // Create the JSX for the component
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.paper}
    >
      <Grid item align="center">
        <Avatar className={classes.styleIcon}></Avatar>
        <Typography variation="h6" color="default">
          Update Cause
        </Typography>
      </Grid>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Edit Title"
          name="title"
          value={stateUpdate.title}
          onChange={handleChange}
          multiline
          rowsMax={4}
          size="small"
          className={classes.mgstyle}
        />
        <TextField
          id="post"
          label="Edit Cause Description"
          name="content"
          value={stateUpdate.content}
          onChange={handleChange}
          variant="filled"
          multiline
          rows={4}
          fullWidth
          className={classes.mgstyle}
          size="small"
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
        <Button type="submit" size="large" className={classes.styleMain} fullWidth>
          Update
        </Button>
      </form>
      {previewSource && <img src={previewSource} alt="chosen" className={classes.imgStyle} />}
    </Grid>
  );
};

export default UpdateCause;
