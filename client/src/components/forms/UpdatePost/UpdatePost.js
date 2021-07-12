/* eslint-disable react-hooks/exhaustive-deps */
// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./style.css";
import { useState, useEffect } from "react";
import api from "../../../utils/api";
import useUpdateStyles from "../useStyles/useUpdateStyles";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { UPDATE, ADD, LOADING } from "../../../utils/actions/actions";

// Create the component function and export for use
const UpdatePost = props => {
  // Call the styles function
  const classes = useUpdateStyles();
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [stateUpdate, setStateUpdate] = useState({
    title: "",
    content: ""
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
  const updatePost = async update => {
    await api.updatePost(props.id, update);

    const { data } = await api.getUser(globalState.user._id);
    dispatch(UPDATE, { user: data, loading: false });
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const { data } = await api.findUserPosts(props.id);
      dispatch(ADD, { singlePosts: data, loading: false });

      setStateUpdate({
        title: data.title,
        content: data.content
      });
    }
    fetchUserInfo();
  }, []);

  const dispatch = async (action, payload) => {
    await globalDispatch({ type: LOADING });
    await globalDispatch({
      type: action,
      payload: {
        ...payload
      }
    });
    return;
  };

  // Create the JSX for the component
  return (
    <Grid className='cardPost'>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}>
        <div>
          <Grid container>
            <TextField
              id='title'
              label='Edit Title'
              name='title'
              value={stateUpdate.title}
              onChange={handleChange}
              multiline
              rowsMax={4}
              className={classes.inputMargin}
              size='small'
            />
            <TextField
              id='post'
              label='Edit Message'
              name='content'
              value={stateUpdate.content}
              onChange={handleChange}
              variant='filled'
              multiline
              rows={4}
              fullWidth
              size='small'
            />
            <TextField
              type='file'
              name='image'
              onChange={handleFileInputChange}
              value={fileInputState}
              variant='outlined'
            />
          </Grid>
        </div>
        <Button
          size='small'
          className={classes.styleMain}
          onClick={handleSubmit}>
          <ChatBubbleOutlineIcon /> Update
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt='chosen' className={classes.imgStyle} />
      )}
    </Grid>
  );
};

export default UpdatePost;
