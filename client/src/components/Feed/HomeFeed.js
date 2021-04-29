// Import all relevant packages and components
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  CardMedia,
  Divider,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button
} from "@material-ui/core";
import useNewsStyles from "./styles/useNCStyles";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./styles/style.css";
import { Delete, Favorite } from "@material-ui/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { LOADING, UPDATE } from "../../utils/actions/actions";
import { useSocket } from "../../utils/GlobalStates/SocketProvider";
import { useGlobalContext } from "../../utils/GlobalStates/GlobalState";
import CommentSection from "./components/CommentSection";

// Create the component function and export for use
const HomeFeed = props => {
  // Call the styles function
  const classes = useNewsStyles();
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  // Create the set and setState from useState
  const [commentState, setCommentState] = useState({
    content: ""
  });
  // Call useSocket function
  const socket = useSocket();
  // Create the handleChange function
  const handleChange = function(event) {
    const { name, value } = event.target;
    setCommentState({
      ...commentState,
      [name]: value
    });
  };
  // Create the handleSubmit function
  const handleSubmit = async id => {
    try {
      const comment = {
        ...commentState,
        user: globalState.user._id,
        post: id
      };
      const { data } = await api.createComments(comment);
      await api.updateObjectID(id, {
        comments: data._id
      });

      const postInfo = await api.getAllPost();
      dispatch(UPDATE, { posts: postInfo.data, loading: false });
      const payload = { isPost: true };

      socket.emit("send-message", payload);
      clearState();
    } catch (err) {}
  };
  // Create the clearState function
  const clearState = () => {
    setCommentState({
      content: ""
    });
    return;
  };
  // Create the handleLike function
  const handleLike = async id => {
    const found = props.liked.find(l => l._id === globalState.user._id);
    if (found) {
      await api.removeliked(id, {
        likes: globalState.user._id
      });
    } else {
      await api.updateObjectID(id, {
        likes: globalState.user._id
      });
    }
    const postInfo = await api.getAllPost();
    dispatch(UPDATE, { posts: postInfo.data, loading: false });
  };

  useEffect(() => {
    const updatePosts = async posts => {
      const postInfo = await api.getAllPost();
      dispatch(UPDATE, { posts: postInfo.data, loading: false });
    };
    socket.on("update-post", updatePosts);
    return () => socket.off("update-post");
  }, []);

  const dispatch = async (action, payload) => {
    await globalDispatch({
      type: LOADING
    });

    await globalDispatch({
      type: action,
      payload: {
        ...payload
      }
    });
  };

  // Create the JSX for the component
  return (
    <>
      <Grid item className="card" xs={12}>
        <Grid container className="headerContainer">
          <Grid item xs={9} sm={11}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={1}>
            <Button className="editButton" onClick={() => handleLike(props.id)}>
              <>
                {props.liked.find(l => l._id === globalState.user._id) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </>
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body2" color="textSecondary" component="p">
          <span className="authorStyle"> Author:</span>
          <Link
            to={
              props.authorId === globalState.user._id
                ? "/dashboard"
                : `/dashboard/${props.authorId}`
            }
          >
            {props.author}
          </Link>
        </Typography>

        <Divider />

        <Grid container direction="row" spacing={1}>
          {props.image && (
            <Grid item xs={12} sm={4}>
              <CardMedia
                style={{ height: "190px" }}
                className={"media"}
                image={`https://res.cloudinary.com/astralgnome/image/upload/${props.image}`}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant="body" color="textSecondary" component="p">
                {props.post}
              </Typography>
            </CardContent>
            <Divider />
          </Grid>
        </Grid>

        <Grid container xs={12} spacing={1}>
          <Grid item xs={12} sm={8}>
            <TextField
              name="content"
              value={commentState.content}
              onChange={handleChange}
              id={props.id}
              label="Post a Comment"
              variant="filled"
              size="small"
              multiline
              rowsMax={4}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} id={props.id}>
            <Button
              size="small"
              id={props.id}
              className={classes.styleMain}
              fullWidth
              onClick={() => handleSubmit(props.id)}
            >
              <ChatBubbleOutlineIcon id={props.id} /> Comment
            </Button>
          </Grid>

          {props.comments.length >= 0 && (
            <Accordion className={classes.shadow}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.commentStyle} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Read {props.comments.length} Comments
                </Typography>
              </AccordionSummary>

              <CommentSection comments={props.comments} author={props.author} />
            </Accordion>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HomeFeed;
