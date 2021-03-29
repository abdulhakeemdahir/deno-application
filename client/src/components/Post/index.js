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
import { useUserContext } from "../../utils/GlobalStates/UserContext";
import {
  ADD_CAUSE,
  ADD_POST,
  ADD_TREND,
  CAUSE_LOADING,
  POST_LOADING,
  TREND_LOADING,
  UPDATE_USER,
  USER_LOADING
} from "../../utils/actions/actions";
import { usePostContext } from "../../utils/GlobalStates/PostContext";
import { useCauseContext } from "../../utils/GlobalStates/CauseContext";
import findHashtags from "find-hashtags";
import api from "../../utils/api.js";
import { useTrendingContext } from "../../utils/GlobalStates/TrendingContext";

// Create the component function and export for use
const Post = () => {
  // Destructure State and Dispatch from Context
  const [userState, userDispatch] = useUserContext();
  const [, causeDispatch] = useCauseContext();
  const [, trendingDispatch] = useTrendingContext();
  const [, postDispatch] = usePostContext();
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
  //*Create Post
  const addPost = async () => {
    await postDispatch({ type: POST_LOADING });
    const postInfo = await api.getAllPost();
    await postDispatch({
      type: ADD_POST,
      payload: {
        posts: postInfo.data,
        loading: false
      }
    });
    await trendingDispatch({ type: TREND_LOADING });
    const hashInfo = await api.getHashtagAll();
    await trendingDispatch({
      type: ADD_TREND,
      payload: {
        hashtag: hashInfo.data,
        loading: false,
      },
    });
  };
  //Create cause
  const addCause = async () => {
    await causeDispatch({
      type: CAUSE_LOADING
    });
    const causes = await api.getAllCauses();
    await causeDispatch({
      type: ADD_CAUSE,
      payload: {
        causes: causes.data,
        loading: false
      }
    });
  };
  // Update user
  const updateUserStates = async () => {
    const userInfo = await api.getUser(userState._id);
    await userDispatch({ type: USER_LOADING });
    await userDispatch({
      type: UPDATE_USER,
      payload: {
        ...userInfo.data,
        loading: false
      }
    });
  };
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
        author: userState._id
      };
      //the only line we need it to add
      if (previewSource) {
        post.imageUrl = previewSource;
      }
      const hashtags = await findHashtags(createPost.content);
      if (hashtags.length) {
        const createHashtags = await api.createHashtag({ hashtag: hashtags });
        post.hashtags = createHashtags.data._id;
      }
      if (userState.role === "Personal" || createPost.type === "Post") {
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
        await addPost();
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
        await addCause();
      }
      await updateUserStates();
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
        {userState.role === "Personal" ? null : (
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
