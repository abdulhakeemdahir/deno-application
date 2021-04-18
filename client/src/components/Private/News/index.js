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
  Button,
  Dialog
} from "@material-ui/core";
import useNewsStyles from "./useNewsStyles";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Delete, Edit } from "@material-ui/icons";
import "./style.css";
import UpdatePost from "../../Forms/UpdatePost/UpdatePost";
import api from "../../../utils/api";
import { LOADING, UPDATE } from "../../../utils/actions/actions";
import { useSocket } from "../../../utils/GlobalStates/SocketProvider";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../utils/GlobalStates/GlobalState";

// Create the component function and export for use
const News = props => {
  // Call the styles function
  const classes = useNewsStyles();
  // Create the set and setState from useState
  const [open, setOpen] = useState(false);
  // Destructure State and Dispatch from Context
  const [globalState, globalDispatch] = useGlobalContext();
  // Create the set and setState from useState
  const [commentState, setCommentState] = useState({
    content: ""
  });
  // Call useSocket
  const socket = useSocket();
  // Create the clearState function
  const clearState = () => {
    setCommentState({
      content: ""
    });
    return;
  };
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
      const userInfo = await api.getUser(globalState.user._id);
      dispatch(UPDATE, { user: userInfo.data, loading: false });

      if (globalState.guessUser._id) {
        const guessInfo = await api.getUser(globalState.guessUser._id);
        dispatch(UPDATE, { guessUser: guessInfo.data, loading: false });

        socket.emit("send-comment-dashboard", globalState.guessUser._id);
      } else {
        socket.emit("send-comment-dashboard", globalState.user._id);
      }
      clearState();
    } catch (err) {}
  };

  useEffect(() => {
    const updateDashboard = async user => {
      if (user._id === globalState.user._id) {
        const userInfo = await api.getUser(globalState.user._id);
        dispatch(UPDATE, { user: userInfo.data, loading: false });
      } else {
        const guessInfo = await api.getUser(globalState.guessUser._id);
        dispatch(UPDATE, { guessUser: guessInfo.data, loading: false });
      }
    };
    socket.on("update-dashboard", updateDashboard);
    return () => socket.off("update-dashboard");
  }, []);

  const handleRemove = async (idPost, authorId) => {
    if (authorId !== globalState.user._id) {
      return;
    }

    await api.removePost(idPost, authorId);

    const userInfo = await api.getUser(globalState.user._id);
    dispatch(UPDATE, { user: userInfo.data, loading: false });
  };

  const handleRemoveComment = async (commentId, postId) => {
    await api.removeComments(commentId, postId);

    const userInfo = await api.getUser(globalState.user._id);
    dispatch(UPDATE, { user: userInfo.data, loading: false });
  };

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
  // Create the handleOpen function
  const handleOpen = () => {
    setOpen(true);
  };
  // Create the handleClose function
  const handleClose = () => {
    setOpen(false);
  };
  // Create the JSX for the component
  return (
    <>
      <Grid item className="card" xs={12}>
        <Grid container className="headerContainer">
          <Grid item xs={7} sm={8}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={5} sm={4}>
            {props.check ? null : (
              <>
                <Button className="editButton" onClick={handleOpen}>
                  <Edit /> Edit
                </Button>
                <Button
                  className="editButton"
                  onClick={() => handleRemove(props.id, props.authorId)}
                >
                  <Delete /> Delete
                </Button>
              </>
            )}
            <Dialog
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <UpdatePost
                  className={"cardPost"}
                  id={props.id}
                  onClose={handleClose}
                />
              </Fade>
            </Dialog>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" component="p">
          <span className="authorStyle"> Author:</span> {props.author}
        </Typography>
        <Divider />
        <Grid container direction="row" spacing={1}>
          {props.image && (
            <Grid item xs={12} sm={4}>
              <CardMedia
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
          <Grid item xs={12} sm={4}>
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
          <Accordion className={classes.shadow}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.commentStyle} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Read {props.comments?.length} Comments
              </Typography>
            </AccordionSummary>
            <Grid className="cardComment">
              {props.comments.map(card => (
                <AccordionDetails>
                  <Grid container xs={12} className={classes.gridStyle}>
                    <Grid item xs={4}>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        component="p"
                      >
                        <Link
                          to={
                            card.user._id === globalState.user._id
                              ? "/dashboard"
                              : `/dashboard/${card.user._id}`
                          }
                        >
                          {card.user.username}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        component="p"
                      >
                        {card.content}
                      </Typography>
                    </Grid>
                    {card.user._id === globalState.user._id ||
                    globalState.user.username === props.author ? (
                      <Grid item xs={1}>
                        <Button
                          className="editButton"
                          onClick={() =>
                            handleRemoveComment(card._id, card.post)
                          }
                        >
                          <Delete />
                        </Button>
                      </Grid>
                    ) : null}
                  </Grid>
                </AccordionDetails>
              ))}
            </Grid>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default News;
