// Import all relevant packages and components
import { Grid, Button, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import usePostStyles from "./usePostStyles";
import "./style.css";
import { useState } from "react";
import {
  LOADING,
  UPDATE
} from "../../utils/actions/actions";
import findHashtags from "find-hashtags";
import api from "../../utils/api.js";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";

// Create the component function and export for use
const Post = () => {
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();

  //*Associated with cloudinary
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  // Call the styles function
  const classes = usePostStyles();
  // Create the set and setState from useState
  const [createPost, setCreatePost] = useState({
    type: "",
    title: "",
    titleError: "",
    content: "",
    contentError: "",
    imageUrl: ""
  });

  // Create the handleChange function
  const handleChange = function(event) {
    const { name, value } = event.target;
    setCreatePost({
      ...createPost,
      [name]: value
    });
  };
  // Create the handleSubmit function
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const post = {
        ...createPost,
        author: globalState.user._id
      };
      //check is there is an image
      if (previewSource) {
        post.imageUrl = previewSource;
      }
      const hashtags = await findHashtags(createPost.content);
      if (hashtags.length) {
        const createHashtags = await api.createHashtag({ hashtag: hashtags });
        post.hashtags = createHashtags.data._id;
      }
      if (globalState.user.role === "Personal" || createPost.type === "Post") {
        setCreatePost({
          ...createPost,
          type: "Post"
        });
        const { data } = await api.createPost(post);
        if (post.hashtags) {
          await api.updateHashtag(post.hashtags, {
            posts: data._id
          });
        }
        await api.updateUserObjectID(post.author, {
          posts: data._id
        });

        const postInfo = await api.getAllPost();
        dispatch(UPDATE, { posts: postInfo.data, loading: false });

        const hashInfo = await api.getHashtagAll();
        dispatch(UPDATE, { hashtag: hashInfo.data, loading: false });


      } else {
        const { data } = await api.createCause(post);
        if (post.hashtags) {
          await api.updateHashtag(post.hashtags, {
            causes: data._id
          });
        }

        await api.updateUserObjectID(post.author, {
          causes: data._id
        });
        const causes = await api.getAllCauses();
        dispatch(UPDATE, { causes: causes.data, loading: false });
      }

      const userInfo = await api.getUser(globalState.user._id);
      dispatch(UPDATE, { user: userInfo.data, loading: false });

      clearState();
    } catch (err) {}
  };
  // Create the clearState function
  const clearState = () => {
    setCreatePost({
      type: "",
      title: "",
      titleError: "",
      content: "",
      contentError: "",
      imageUrl: ""
    });
    setPreviewSource("");
    return;
  };
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

  const dispatch = async (action, payload) => {
    await globalDispatch({ type: LOADING });
    await globalDispatch({
      type: action,
      payload: {
        ...payload,
      },
    });
    return;
  };


  // Form validation for inputs to be more than 6 characters
  const validate = event => {
    const { name, value } = event.target;
    console.log(name);
    let isError = false;
    const errors = {};
    if (value.length < 1) {
      isError = true;
      errors[`${name}Error`] = "Input cannot be empty";
    }

    if (isError) {
      setCreatePost({
        ...createPost,
        ...errors
      });
    }
    if (value.length >= 1) {
      errors[`${name}Error`] = "";
      setCreatePost({
        ...createPost,
        ...errors
      });
    }
    return isError;
  };
  // Create the JSX for the component
  return (
    <Grid className="cardPost">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {globalState.user.role === "Personal" ? null : (
          <FormControl variant="outlined">
            <InputLabel id="post">Post Type</InputLabel>
            <Select
              labelId="post"
              id="post"
              label="post type"
              name="type"
              onChange={handleChange}
            >
              <MenuItem value={"Post"}>Post</MenuItem>
              <MenuItem value={"Cause"}>Cause</MenuItem>
            </Select>
          </FormControl>
        )}
        <div>
          <Grid container>
            <TextField
              error={createPost.titleError}
              helperText={createPost.titleError}
              name="title"
              value={createPost.title}
              onChange={handleChange}
              onBlur={validate}
              id="title"
              // label='Title'
              placeholder="Enter Title"
              className="postBackground"
              size="small"
              variant="outlined"
              fullWidth
            />

            <TextField
              error={createPost.contentError}
              helperText={createPost.contentError}
              name="content"
              value={createPost.content}
              onChange={handleChange}
              onBlur={validate}
              id="post"
              // label='Post'
              placeholder="Post a Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              size="small"
              className="postBackground"
            />
          </Grid>
        </div>

        <TextField
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          variant="outlined"
        />
        <Button type="submit" size="small" className={classes.styleMain}>
          <ChatBubbleOutlineIcon /> Post
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" className={classes.imgStyle} />
      )}
    </Grid>
  );
};

export default Post;
