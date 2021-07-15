/* eslint-disable react-hooks/exhaustive-deps */
// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./style.css";
import { useEffect } from "react";
import api from "../../../utils/api";
import useUpdateStyles from "../useStyles/useUpdateStyles";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";
import { UPDATE, ADD, LOADING } from "../../../utils/actions/actions";
import useForm from "../Utils/useForm";

// Create the component function and export for use
const UpdatePost = props => {
  // Call the styles function
  const classes = useUpdateStyles();
  // Destructure State and Dispatch from Context;
  const [globalState, globalDispatch] = useGlobalContext();

  const { inputs, handleChange, setInputs } = useForm({
    title: "",
    content: "",
    imageUrl: ""
  });

  // Create the handleSubmit function
  const handleSubmit = async event => {
    event.preventDefault();
    const updateUser = {};

    if (inputs.title !== "") {
      updateUser.title = inputs.title;
    }
    if (inputs.content !== "") {
      updateUser.content = inputs.content;
    }
    //*Associated with cloudinary
    if (inputs.imageUrl !== "") {
      updateUser.imageUrl = inputs.imageUrl;
    }
    await updatePost(updateUser);

    props.onClose();
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

      setInputs({
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
              value={inputs.title}
              onChange={handleChange}
              multiline
              maxRows={4}
              className={classes.inputMargin}
              size='small'
            />
            <TextField
              id='post'
              label='Edit Message'
              name='content'
              value={inputs.content}
              onChange={handleChange}
              variant='filled'
              multiline
              rows={4}
              fullWidth
              size='small'
            />
            <TextField
              type='file'
              name='imageUrl'
              onChange={handleChange}
              value={""}
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
      {inputs.imageUrl && (
        <img src={inputs.imageUrl} alt='chosen' className={classes.imgStyle} />
      )}
    </Grid>
  );
};

export default UpdatePost;
